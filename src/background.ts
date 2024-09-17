chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {

  if (message.type === 'getAccessToken') {
    getAccessToken().then((accessToken) => {
      sendResponse({ accessToken });
    }).catch((error) => {
      sendResponse({ error });
    });
    return true;
  }

  if (message.type === 'isAuthenticated') {
    isAuthenticated().then((result) => {
      sendResponse({value: result});
    })
    .catch((error) => {
      sendResponse({error})
    })
    return true
  }

  if (message.type === 'revokeAccessToken') {
    revokeAccessToken().then((response) => {
      sendResponse({value: response})
    })
    .catch((error) => {
      sendResponse({error})
    })
    return true;
  }
});

async function getAccessToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError) {
        reject(new Error(`Access token error: ${chrome.runtime.lastError.message}`));
        return;
      }

      if (!token) {
        reject(new Error('No token received'));
        return;
      }

      resolve(token);
    });
  });
}

async function isAuthenticated(): Promise<boolean> {
  return new Promise((resolve) => {
    chrome.identity.getAuthToken({ interactive: false }, (token) => {
      if (chrome.runtime.lastError || !token) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}


async function revokeAccessToken(): Promise<string> {
  try {
    const token = await getAccessToken();

    await new Promise<void>((resolve, reject) => {
      chrome.identity.removeCachedAuthToken({ token }, () => {
        if (chrome.runtime.lastError) {
          reject(new Error(`Error revoking token from cache: ${chrome.runtime.lastError.message}`));
        } else {
          resolve();
        }
      });
    });

    const response = await fetch(`https://oauth2.googleapis.com/revoke?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    });

    if (!response.ok) {
      throw new Error(`Error revoking token from server: ${response.statusText}`);
    }

    chrome.tabs.create({ url: 'https://accounts.google.com/Logout' });

    console.log("Token revoked successfully from both cache and server");
    return "Success";
  } catch (error) {
    console.error(error);
    throw error;
  }
}

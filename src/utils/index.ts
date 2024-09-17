import { Label } from "../types/Label";

async function requestAccessToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: 'getAccessToken' }, (response) => {
      if (response && response.accessToken) {
        resolve(response.accessToken);
      } else {
        reject('Failed to retrieve access token');
      }
    });
  });
}

async function checkIfUserIsAuthenticated(): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: 'isAuthenticated' }, (response) => {
      resolve(response)
    });
  });
}

async function logout(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: 'revokeAccessToken' }, (response) => {
      if (response && response.value === "Success") {
        resolve(true);
      } else {
        console.error('Failed to revoke access token:', response.error);
        resolve(false);
      }
    });
  });
}


const copyToClipboard = (event: Event) => {
  const target = event.currentTarget as HTMLElement;
  const alias = target.getAttribute('data-alias');
  
  if (alias) {
    navigator.clipboard.writeText(alias).then(() => {
      console.log('Alias copied to clipboard:', alias);
    }).catch(err => {
      console.error('Failed to copy alias:', err);
    });
  }
};

const generateAlias = ({ label, email }: { label: Label, email: string }): string => {
  return `${email.split('@')[0]}+${label.name}@${email.split('@')[1]}`
};


export {
  logout,
  generateAlias,
  copyToClipboard,
  requestAccessToken,
  checkIfUserIsAuthenticated,
}
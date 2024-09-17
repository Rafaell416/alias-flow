import { API_ENDPOINT } from "../../constants/API_ENDPOINT";
import { requestAccessToken } from "../../utils";
import { User } from "../../types/User";

async function fetchCurrentUser(): Promise<User> {
  try {
    const accessToken = await requestAccessToken();
    const response = await fetch(`${API_ENDPOINT}/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error fetching user email: ${errorData.error.message}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user email:', error);
    throw error;
  }
}

export {
  fetchCurrentUser
}
import { requestAccessToken } from "../../utils";
import { API_ENDPOINT } from "../../constants/API_ENDPOINT";

async function deleteFilter(filterId: string): Promise<void> {
  try {
    const accessToken = await requestAccessToken();
    const response = await fetch(`${API_ENDPOINT}/settings/filters/${filterId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (response.ok) {
      console.log('Filter deleted successfully');
    } else {
      const errorData = await response.json();
      console.error('Error deleting filter:', errorData);
      throw new Error(errorData.error.message);
    }
  } catch (error) {
    console.error('Error during filter deletion:', error);
    throw error;
  }
}

export {
  deleteFilter
}

import { requestAccessToken } from "../../utils";
import { API_ENDPOINT } from "../../constants/API_ENDPOINT";

async function deleteLabel(labelId: string): Promise<void> {
  try {
    const accessToken = await requestAccessToken();
    const response = await fetch(`${API_ENDPOINT}/labels/${labelId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (response.ok) {
      console.log('Label deleted successfully');
    } else {
      const errorData = await response.json();
      console.error('Error deleting label:', errorData);
      throw new Error(errorData.error.message);
    }
  } catch (error) {
    console.error('Error during label deletion:', error);
    throw error;
  }
}

export {
  deleteLabel
}

import { requestAccessToken } from "../../utils";
import { API_ENDPOINT } from "../../constants/API_ENDPOINT";
import { Filter } from "../../types/Filter";

async function fetchFilters(): Promise<Filter[]> {
  try {
    const accessToken = await requestAccessToken();
    const response = await fetch(`${API_ENDPOINT}/settings/filters`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching filters:', errorData);
      throw new Error(errorData.error.message);
    }

    const data = await response.json();
    return data.filter as Filter[];
  } catch (error) {
    console.error('Error during fetching filters:', error);
    throw error;
  }
}

export {
  fetchFilters
}
import { API_ENDPOINT } from "../../constants/API_ENDPOINT";
import { requestAccessToken } from "../../utils";
import { Filter } from "../../types/Filter";

async function createFilter(aliasEmail: string, labelId: string): Promise<Filter> {
  try {
    const accessToken = await requestAccessToken();
    const response = await fetch(`${API_ENDPOINT}/settings/filters`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        criteria: {
          to: aliasEmail
        },
        action: {
          addLabelIds: [labelId],
          removeLabelIds: ['INBOX']
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error creating filter:', errorData);
      throw new Error(errorData.error.message);
    } else {
      const success = await response.json();
      console.log({success});
      console.log('Filter created successfully');
      return success;
    }

  } catch (error) {
    console.error('Error during filter creation:', error);
    throw error;
  }
}

export {
  createFilter
}
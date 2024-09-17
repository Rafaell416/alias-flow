import { requestAccessToken } from "../../utils";
import { API_ENDPOINT } from "../../constants/API_ENDPOINT";
import { Label } from "../../types/Label";

async function createLabel(labelName: string): Promise<Label> {
  try {
    const accessToken = await requestAccessToken();
    const response = await fetch(`${API_ENDPOINT}/labels`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: labelName })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Label created successfully:', data);
      return data;
    } else {
      const errorData = await response.json();
      console.error('Error creating label:', errorData);
      return errorData;
    }
  } catch (error) {
    console.error('Error during label creation:', error);
    throw error;
  }
}

export {
  createLabel
}
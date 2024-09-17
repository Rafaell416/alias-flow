import { API_ENDPOINT } from "../../constants/API_ENDPOINT";
import { requestAccessToken } from "../../utils";
import { Label } from "../../types/Label";

async function fetchLabels(): Promise<Label[]> {
  try {
    const accessToken = await requestAccessToken();
    const response = await fetch(`${API_ENDPOINT}/labels`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error fetching labels: ${errorData.error.message}`);
    }

    const data = await response.json();
    const customLabels = data.labels.filter((label: Label) => !isSystemLabel(label.id));
    return customLabels;
  } catch (error) {
    console.error('Error fetching Gmail labels:', error);
    throw error;
  }
}

function isSystemLabel(labelId: string): boolean {
  const systemLabels = [
    "INBOX", "SENT", "DRAFT", "TRASH", "SPAM", "STARRED", "UNREAD", 
    "CATEGORY_PERSONAL", "CATEGORY_SOCIAL", "CATEGORY_PROMOTIONS", 
    "CATEGORY_UPDATES", "CATEGORY_FORUMS", "IMPORTANT", "CHAT"
  ];
  return systemLabels.includes(labelId);
}

export {
  fetchLabels
}
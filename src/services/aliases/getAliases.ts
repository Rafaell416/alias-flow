import { fetchCurrentUser } from "../user/fetchCurrentUser";
import { fetchLabels } from "../labels/fetchLabels";
import { Alias } from "../../types/Alias";
import { generateAlias } from "../../utils";

async function getAliases(): Promise<Alias[]> {
  try {
    const labels = await fetchLabels();
    const user = await fetchCurrentUser();
    const email = user.emailAddress;
    const aliases = labels.map(label => {
      return {
        id: label.id,
        alias: generateAlias({ email, label })
      }
    });
    return aliases;
  } catch (error) {
    console.error('Error getting aliases:', error);
    throw error;
  }
}

export {
  getAliases
}
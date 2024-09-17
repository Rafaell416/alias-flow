import { fetchFilters } from "./fetchFilters";
import { deleteFilter } from "./deleteFilter";

async function deleteFilterByAlias(aliasEmail: string): Promise<void> {
  try {
    const filters = await fetchFilters();
    const filterToDelete = filters.find(filter => filter.criteria.to === aliasEmail);

    if (filterToDelete) {
      await deleteFilter(filterToDelete.id);
      console.log('Filter deleted successfully.');
    } else {
      console.log('No filter found for the alias email.');
    }
  } catch (error) {
    console.error('Error during filter deletion:', error);
    throw error;
  }
}

export {
  deleteFilterByAlias
}
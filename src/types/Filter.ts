export interface Filter {
  id: string;
  criteria: FilterCriteria;
  action: FilterAction;
}

interface FilterCriteria {
  to?: string; 
}

interface FilterAction {
  addLabelIds: string[]; 
  removeLabelIds?: string[];
}
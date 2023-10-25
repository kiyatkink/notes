import { StoreSchema } from 'app/StoreProvider';
import { initialState } from '../../slice/noteFiltersSlice/noteFiltersSlice';

export const getNoteFiltersOrder = (store: StoreSchema) => store.filters?.order ?? ''
export const getNoteFiltersSearch = (store: StoreSchema) => store.filters?.search ?? ''
export const getNoteFilters = (store: StoreSchema) => store.filters ?? initialState

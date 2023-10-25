import { StoreSchema } from 'app/StoreProvider';
import { initialStore } from '../../slice/noteListSlice/noteListSlice';

export const getNoteListError = (store: StoreSchema) => store?.noteList?.error || ''

export const getNoteListIsLoading = (store: StoreSchema) => store?.noteList?.isLoading || false

export const getNoteListPage = (store: StoreSchema) => store?.noteList?.page || 1

export const getNoteListHasMore = (store: StoreSchema) => store?.noteList?.hasMore || false

export const getNoteList = (store: StoreSchema) => store?.noteList || initialStore

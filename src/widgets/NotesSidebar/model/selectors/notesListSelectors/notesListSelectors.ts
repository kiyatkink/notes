import { StoreSchema } from 'app/StoreProvider';

export const getNoteListError = (store: StoreSchema) => store?.noteList?.error || undefined

export const getNoteListIsLoading = (store: StoreSchema) => store?.noteList?.isLoading || false

export const getNoteListPage = (store: StoreSchema) => store?.noteList?.page || 1

export const getNoteListHasMore = (store: StoreSchema) => store?.noteList?.hasMore || false

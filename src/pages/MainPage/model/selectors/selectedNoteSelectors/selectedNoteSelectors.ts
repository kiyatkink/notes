import { StoreSchema } from 'app/StoreProvider';

export const getSelectedNote = (store: StoreSchema) => store.selectedNote?.note
export const getIsEdit = (store: StoreSchema) => store.selectedNote?.isEdit
export const getEditNote = (store: StoreSchema) => store.selectedNote?.editNote
export const getIsCreateLoading = (store: StoreSchema) => store.selectedNote?.isLoading
export const getCreateError = (store: StoreSchema) => store.selectedNote?.error

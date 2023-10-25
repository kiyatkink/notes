import { StoreSchema } from 'app/StoreProvider';

export const getSelectedNote = (store: StoreSchema) => store.selectedNote?.note
export const getIsEdit = (store: StoreSchema) => store.selectedNote?.isEdit
export const getIsCreateLoading = (store: StoreSchema) => store.selectedNote?.isCreateLoading

export const getCreateError = (store: StoreSchema) => store.selectedNote?.createError

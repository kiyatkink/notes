import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { AnyAction, ReducersMapObject } from '@reduxjs/toolkit';
import { CombinedState, Reducer } from 'redux';
import { AxiosInstance } from 'axios';
import { NoteFiltersSchema } from 'features/NoteFilters';
import { NoteListSchema } from 'widgets/NotesSidebar';
import { SelectedNoteSchema } from 'pages/MainPage';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StoreSchema {
    noteList: NoteListSchema
    selectedNote: SelectedNoteSchema
    filters: NoteFiltersSchema
}

export type StoreSchemaKeys = keyof StoreSchema

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StoreSchema>,
    reduce: (state: StoreSchema, action: AnyAction) => CombinedState<StoreSchema>,
    add: (key: StoreSchemaKeys, reducer: Reducer) => void,
    remove:(key: StoreSchemaKeys) => void,
}
export interface StoreWithReducerManager extends ToolkitStore<StoreSchema> {
    reducerManager?: ReducerManager
}

export interface ExtraType {
    api: AxiosInstance
}
export interface ThunkApiConfig<T> {
    rejectValue: T,
    extra: ExtraType
}

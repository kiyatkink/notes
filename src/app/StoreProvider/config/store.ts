import { combineReducers, configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { $api } from 'shared/api/api'
import { Reducer } from 'redux';
import { noteFiltersReducer } from 'features/NoteFilters';
import { noteListReducer } from 'widgets/NotesSidebar';
import { selectedNoteReducer } from 'pages/MainPage';
import { StoreSchema, StoreWithReducerManager } from '../types/StoreSchema';

export function createReduxStore(
  initialStore?: StoreSchema,
) {
  const isDev = process.env.MODE === 'development'

  const staticReducers: ReducersMapObject<StoreSchema> = {
    filters: noteFiltersReducer,
    noteList: noteListReducer,
    selectedNote: selectedNoteReducer,
  }

  const store: StoreWithReducerManager = configureStore({
    reducer: combineReducers(staticReducers),
    devTools: isDev,
    preloadedState: initialStore,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api: $api,
        },
      },
    }),
  })

  return store
}

import { combineReducers, configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { $api } from 'shared/api/api'
import { Reducer } from 'redux';
import { StoreSchema, StoreWithReducerManager } from '../types/StoreSchema';

export function createReduxStore(
  initialStore?: StoreSchema,
  asyncReducers?: Partial<Record<keyof StoreSchema, Reducer>>,
) {
  const isDev = process.env.MODE === 'development'

  const staticReducers: ReducersMapObject<StoreSchema> = {
    // counter: counterReducer,
    // user: userReducer,
    // page: pageReducer,
    // ...asyncReducers,
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

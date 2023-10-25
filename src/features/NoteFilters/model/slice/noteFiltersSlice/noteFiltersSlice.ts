import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  NoteFiltersSchema, OrderType,
} from '../../types/NoteFiltersSchema';

export const initialState: NoteFiltersSchema = {
  order: 'desk',
  search: '',
}

export const noteFiltersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeOrder: (state, action: PayloadAction<OrderType>) => {
      state.order = action.payload
    },
    changeSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  },
})

export const { actions: noteFiltersActions, reducer: noteFiltersReducer } = noteFiltersSlice

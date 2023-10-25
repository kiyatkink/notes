import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Note } from 'entities/Note';
import { SelectedNoteSchema } from '../../types/SelectedNoteSchema';
import { createNote } from '../../services/createNote/createNote';

export const initialState: SelectedNoteSchema = {
  note: undefined,
  isEdit: false,
  isCreateLoading: false,
  createError: undefined,
}

export const selectedNoteSlice = createSlice({
  name: 'selectedNote',
  initialState,
  reducers: {
    selectNote: (state, action: PayloadAction<Note>) => {
      state.note = action.payload
    },
    startEdit: (state) => {
      state.isEdit = true
      state.editNote = state.note
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        state.isCreateLoading = true
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isCreateLoading = false
        state.note = action.payload
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isCreateLoading = false
        state.createError = action.payload
      })
  },
})

export const { actions: selectedNoteActions, reducer: selectedNoteReducer } = selectedNoteSlice

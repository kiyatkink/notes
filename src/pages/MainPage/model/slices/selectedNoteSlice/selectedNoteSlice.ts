import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Note } from 'entities/Note';
import { SelectedNoteSchema } from '../../types/SelectedNoteSchema';
import { createNote } from '../../services/createNote/createNote';
import { deleteNote } from '../../services/deleteNote/deleteNote';
import { saveNote } from '../../services/saveNote/saveNote';

export const initialState: SelectedNoteSchema = {
  note: undefined,
  editNote: undefined,
  isEdit: false,
  isLoading: false,
  error: undefined,
}

export const selectedNoteSlice = createSlice({
  name: 'selectedNote',
  initialState,
  reducers: {
    selectNote: (state, action: PayloadAction<Note>) => {
      state.note = action.payload
      state.editNote = action.payload
      state.error = undefined
    },
    changeIsEdit: (state, action: PayloadAction<boolean>) => {
      state.isEdit = action.payload
      state.error = undefined
    },
    changeTitle: (state, action: PayloadAction<string>) => {
      if (state.editNote) {
        state.editNote.title = action.payload
      }
    },
    changeText: (state, action: PayloadAction<string>) => {
      if (state.editNote) {
        state.editNote.text = action.payload
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.note = action.payload
        state.editNote = action.payload
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(deleteNote.fulfilled, (state) => {
        state.note = undefined
        state.editNote = undefined
        state.isEdit = false
        state.isLoading = false
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(saveNote.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(saveNote.fulfilled, (state, action) => {
        state.note = action.payload
        state.editNote = action.payload
        state.isEdit = false
        state.isLoading = false
      })
      .addCase(saveNote.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { actions: selectedNoteActions, reducer: selectedNoteReducer } = selectedNoteSlice

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiConfig } from 'app/StoreProvider/types/StoreSchema';
import { Note } from 'entities/Note';
import { noteListActions } from 'widgets/NotesSidebar';

export const createNote = createAsyncThunk<Note, void, ThunkApiConfig<string>>(
  'MainPage/createNote',
  async (_, thunkAPI) => {
    const {
      rejectWithValue, extra, dispatch,
    } = thunkAPI
    try {
      const response = await extra.api.post<Note>('/notes')
      if (!response.data) {
        throw new Error()
      }
      dispatch(noteListActions.updateList())
      return response.data
    } catch (e) {
      return rejectWithValue('Не удалось создать заметку')
    }
  },
)

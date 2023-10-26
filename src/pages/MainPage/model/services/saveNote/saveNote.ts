import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiConfig } from 'app/StoreProvider/types/StoreSchema';
import { Note } from 'entities/Note';
import { noteListActions } from 'widgets/NotesSidebar';
import { ServerErrors } from 'shared/consts/serverErrorsMapper';

export const saveNote = createAsyncThunk<Note, Note, ThunkApiConfig<ServerErrors>>(
  'MainPage/saveNote',
  async (note, thunkAPI) => {
    const {
      rejectWithValue, extra, dispatch,
    } = thunkAPI
    try {
      const response = await extra.api.put<Note>(`/notes/${note.id}`, note)
      if (!response.data) {
        throw new Error()
      }
      dispatch(noteListActions.updateNote(note))
      return response.data
    } catch (e) {
      return rejectWithValue(ServerErrors.FAILED_TO_SAVE_NOTE)
    }
  },
)

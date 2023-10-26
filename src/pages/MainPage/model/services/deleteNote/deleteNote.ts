import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiConfig } from 'app/StoreProvider/types/StoreSchema';
import { Note } from 'entities/Note';
import { noteListActions } from 'widgets/NotesSidebar';
import { ServerErrors } from 'shared/consts/serverErrorsMapper';

export const deleteNote = createAsyncThunk<Note, string, ThunkApiConfig<ServerErrors>>(
  'MainPage/deleteNote',
  async (id, thunkAPI) => {
    const {
      rejectWithValue, extra, dispatch,
    } = thunkAPI
    try {
      const response = await extra.api.delete<Note>(`/notes/${id}`)
      if (!response.data) {
        throw new Error()
      }
      dispatch(noteListActions.deleteNote(id))
      return response.data
    } catch (e) {
      return rejectWithValue(ServerErrors.FAILED_TO_DELETE_NOTE)
    }
  },
)

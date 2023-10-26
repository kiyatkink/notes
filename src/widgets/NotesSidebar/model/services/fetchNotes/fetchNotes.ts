import { createAsyncThunk } from '@reduxjs/toolkit';
import { StoreSchema, ThunkApiConfig } from 'app/StoreProvider/types/StoreSchema';
import { Note } from 'entities/Note';
import { getNoteFilters } from 'features/NoteFilters';
import { ServerErrors } from 'shared/consts/serverErrorsMapper';
import { getNoteListPage } from '../../selectors/notesListSelectors/notesListSelectors';
import { noteListActions } from '../../slice/noteListSlice/noteListSlice';

export const fetchNotes = createAsyncThunk<Note[], void, ThunkApiConfig<ServerErrors>>(
  'MainPage/fetchNotes',
  async (_, thunkAPI) => {
    const {
      rejectWithValue, extra, dispatch, getState,
    } = thunkAPI
    try {
      const page = getNoteListPage(getState() as StoreSchema)
      const limit = 5
      const { search, order } = getNoteFilters(getState() as StoreSchema)

      const response = await extra.api.get<Note[]>('/notes', {
        params: {
          _page: page,
          _limit: limit,
          _order: order,
          _search: search,
        },
      })
      if (!response.data) {
        throw new Error()
      }

      if (response.data.length < limit) {
        dispatch(noteListActions.changeHasMore(false))
      }
      return response.data
    } catch (e) {
      return rejectWithValue(ServerErrors.FAILED_TO_FETCH_NOTES)
    }
  },
)

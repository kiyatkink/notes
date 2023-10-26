import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Note } from 'entities/Note';
import { StoreSchema } from 'app/StoreProvider';
import { fetchNotes } from '../../services/fetchNotes/fetchNotes';
import { NoteListSchema } from '../../types/NoteListSchema';

const noteListAdapter = createEntityAdapter<Note>({
  selectId: (note) => note.id,
})

export const initialStore: NoteListSchema = {
  isLoading: false,
  error: undefined,
  ids: [],
  entities: {},
  hasMore: true,
  page: 1,
}

export const noteListSelectors = noteListAdapter.getSelectors<StoreSchema>(
  (store) => store.noteList || initialStore,
)

export const noteListSlice = createSlice({
  name: 'noteList',
  initialState: noteListAdapter.getInitialState<NoteListSchema>(initialStore),
  reducers: {
    changeHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    updateList: (state) => {
      noteListAdapter.removeAll(state)
      state.hasMore = true
      state.page = 1
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      noteListAdapter.removeOne(state, action.payload)
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      noteListAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.error = undefined
        state.isLoading = true
        if (state.page === 1) {
          noteListAdapter.removeAll(state)
        }
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.isLoading = false
        noteListAdapter.addMany(state, action.payload)
        state.page += 1
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { actions: noteListActions, reducer: noteListReducer } = noteListSlice

import { Note } from 'entities/Note';

export interface SelectedNoteSchema {
    note: Note | undefined,
    isEdit: boolean,
    editNote: Note | undefined,
    isLoading: boolean,
    error: string | undefined,
}

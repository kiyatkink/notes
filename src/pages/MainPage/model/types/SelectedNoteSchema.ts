import { Note } from 'entities/Note';

export interface SelectedNoteSchema {
    note: Note | undefined,
    isEdit: boolean,
    editNote?: Note | null,
    isCreateLoading: boolean,
    createError: string | undefined,
}

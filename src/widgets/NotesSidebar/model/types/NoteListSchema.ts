import { EntityState } from '@reduxjs/toolkit';
import { Note } from 'entities/Note';

export interface NoteListSchema extends EntityState<Note> {
    isLoading: boolean,
    error?: string,
    page: number,
    hasMore: boolean,
}

import { FC, memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './NoteList.module.scss'
import { Note } from '../../model/types/note';
import { NoteListItem } from '../NoteListItem/NoteListItem';
import { NoteSkeletonListItem } from '../NoteSkeletonListItem/NoteSkeletonListItem';

interface NoteListProps {
    className?: string,
    notes: Note[]
    isLoading: boolean,
    selectedNoteId?: string,
    onClickNote: (note: Note) => void,
}

export const NoteList: FC<NoteListProps> = memo((props: NoteListProps) => {
  const {
    className, notes, isLoading, selectedNoteId, onClickNote,
  } = props

  const onSelectNote = useCallback((note: Note) => () => onClickNote(note), [onClickNote])

  const renderSkeletonFunction = useCallback(() => new Array(5).fill(0).map(
    (el, idx) => <NoteSkeletonListItem key={idx} />,
  ), [])

  const renderFunction = useCallback(() => notes.map(
    (note, idx) => (
      <NoteListItem
        key={note.id}
        text={note.text}
        title={note.title}
        selected={note.id === selectedNoteId}
        onSelectNote={onSelectNote(note)}
      />
    ),
  ), [notes, onSelectNote, selectedNoteId])

  return (
    <div className={classNames(cls.NoteList, {}, [className])}>
      { renderFunction() }
      { isLoading && renderSkeletonFunction() }
    </div>
  );
});

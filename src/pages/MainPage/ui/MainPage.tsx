import { FC, memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { NotesSidebar } from 'widgets/NotesSidebar';
import { NoteEditor } from 'widgets/NoteEditor';
import { useDispatch, useSelector } from 'react-redux';
import { Note } from 'entities/Note';
import cls from './MainPage.module.scss'
import {
  getCreateError, getEditNote,
  getIsCreateLoading,
  getIsEdit,
  getSelectedNote,
} from '../model/selectors/selectedNoteSelectors/selectedNoteSelectors';
import { selectedNoteActions } from '../model/slices/selectedNoteSlice/selectedNoteSlice';
import { createNote } from '../model/services/createNote/createNote';
import { deleteNote } from '../model/services/deleteNote/deleteNote';
import { saveNote } from '../model/services/saveNote/saveNote';

interface MainPageProps {
    className?: string
}

const MainPage: FC<MainPageProps> = memo((props: MainPageProps) => {
  const { className } = props

  const dispatch = useDispatch()

  const selectedNote = useSelector(getSelectedNote)
  const editNote = useSelector(getEditNote)
  const isEdit = useSelector(getIsEdit)
  const isLoading = useSelector(getIsCreateLoading)
  const error = useSelector(getCreateError)

  const onSelectNote = useCallback((note: Note) => {
    dispatch(selectedNoteActions.selectNote(note))
  }, [dispatch])

  const onCreateNewNote = useCallback(() => {
    dispatch(createNote())
  }, [dispatch])

  const onEdit = useCallback(() => {
    dispatch(selectedNoteActions.changeIsEdit(true))
  }, [dispatch])

  const onDelete = useCallback(() => {
    selectedNote && dispatch(deleteNote(selectedNote?.id))
  }, [dispatch, selectedNote])

  const onSave = useCallback(() => {
    editNote && dispatch(saveNote(editNote))
  }, [dispatch, editNote])

  const onCancel = useCallback(() => {
    selectedNote && dispatch(selectedNoteActions.selectNote(selectedNote))
    dispatch(selectedNoteActions.changeIsEdit(false))
  }, [dispatch, selectedNote])

  const onChangeTitle = useCallback((value: string) => {
    dispatch(selectedNoteActions.changeTitle(value))
  }, [dispatch])

  const onChangeText = useCallback((value: string) => {
    dispatch(selectedNoteActions.changeText(value))
  }, [dispatch])

  return (
    <div className={classNames(cls.MainPage, {}, [className])}>
      <NotesSidebar
        selectedNote={selectedNote}
        onSelectNote={onSelectNote}
        createNote={onCreateNewNote}
        isLoadingCreate={isLoading}
        error={error}
      />
      { editNote && (
      <NoteEditor
        note={editNote}
        isEdit={isEdit}
        onEdit={onEdit}
        onDelete={onDelete}
        onSave={onSave}
        onCancel={onCancel}
        onChangeTitle={onChangeTitle}
        onChangeText={onChangeText}
        isSaveLoading={isLoading}
        error={error}
      />
      )}
    </div>
  );
});

export default MainPage

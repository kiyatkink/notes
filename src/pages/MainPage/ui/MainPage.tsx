import { FC, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { NotesSidebar } from 'widgets/NotesSidebar';
import { NoteEditor } from 'widgets/NoteEditor';
import { useDispatch, useSelector } from 'react-redux';
import { Note } from 'entities/Note';
import cls from './MainPage.module.scss'
import {
  getCreateError,
  getIsCreateLoading,
  getIsEdit,
  getSelectedNote,
} from '../model/selectors/selectedNoteSelectors/selectedNoteSelectors';
import { selectedNoteActions } from '../model/slices/selectedNoteSlice/selectedNoteSlice';
import { createNote } from '../model/services/createNote/createNote';

interface MainPageProps {
    className?: string
}

const MainPage: FC<MainPageProps> = (props) => {
  const { className } = props

  const dispatch = useDispatch()

  const selectedNote = useSelector(getSelectedNote)
  const isEdit = useSelector(getIsEdit)
  const isCreateLoading = useSelector(getIsCreateLoading)
  const createError = useSelector(getCreateError)

  const onSelectNote = useCallback((note: Note) => {
    dispatch(selectedNoteActions.selectNote(note))
  }, [dispatch])

  const onCreateNewNote = useCallback(() => {
    dispatch(createNote())
  }, [dispatch])

  return (
    <div className={classNames(cls.MainPage, {}, [className])}>
      <NotesSidebar
        selectedNote={selectedNote}
        onSelectNote={onSelectNote}
        createNote={onCreateNewNote}
        isLoadingCreate={isCreateLoading}
      />
      <NoteEditor />
    </div>
  );
};

export default MainPage

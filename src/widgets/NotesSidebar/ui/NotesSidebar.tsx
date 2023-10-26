import { FC, memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Note, NoteList } from 'entities/Note';
import { NoteFilters } from 'features/NoteFilters';
import { AppButton, AppButtonSizes, AppButtonThems } from 'shared/ui/AppButton/AppButton';
import { useDebounce } from 'shared/lib/hooks/useDebounc/useDebounce';
import { ScrollContainer } from 'shared/ui/ScrollContainer/ScrollContainer';
import { useDispatch, useSelector } from 'react-redux';
import { Text, TextThemes } from 'shared/ui/Text/Text';
import { ServerErrors } from 'shared/consts/serverErrorsMapper';
import cls from './NotesSidebar.module.scss'
import { noteListActions, noteListSelectors } from '../model/slice/noteListSlice/noteListSlice';
import {
  getNoteListError,
  getNoteListHasMore,
  getNoteListIsLoading,
} from '../model/selectors/notesListSelectors/notesListSelectors';
import { fetchNotes } from '../model/services/fetchNotes/fetchNotes';

interface NotesSidebarProps {
    className?: string
    selectedNote?: Note
    onSelectNote: (note: Note) => void,
    createNote: () => void
    isLoadingCreate: boolean
    error: string | undefined
}
export const NotesSidebar: FC<NotesSidebarProps> = memo((props: NotesSidebarProps) => {
  const {
    className, selectedNote, onSelectNote, createNote, isLoadingCreate, error,
  } = props
  const dispatch = useDispatch()

  // NoteList
  const notes = useSelector(noteListSelectors.selectAll)
  const isLoadingNotes = useSelector(getNoteListIsLoading)
  const errorNotesFetch = useSelector(getNoteListError)
  const hasMore = useSelector(getNoteListHasMore)

  const infinityScrollCallback = useCallback(() => {
    if (hasMore && !isLoadingNotes) {
      dispatch(fetchNotes())
    }
  }, [dispatch, hasMore, isLoadingNotes])

  const updateNoteList = useDebounce(() => {
    dispatch(noteListActions.changePage(1))
    dispatch(noteListActions.changeHasMore(true))
    dispatch(fetchNotes())
  }, 1000)

  return (
    <div className={classNames(cls.NotesSidebar, {}, [className])}>
      <AppButton
        theme={AppButtonThems.PRIMARY}
        size={AppButtonSizes.L}
        className={cls.create_button}
        onClick={createNote}
        disabled={isLoadingCreate}
      >
        Создать заметку
      </AppButton>
      { error === ServerErrors.FAILED_TO_CREATE_NOTE ? <Text text={error} theme={TextThemes.ERROR} /> : <></>}
      <NoteFilters updateNoteList={updateNoteList} />
      {
        errorNotesFetch
          ? <Text title={errorNotesFetch} theme={TextThemes.ERROR} />
          : (
            <ScrollContainer
              infinityScrollCallback={infinityScrollCallback}
              className={cls.hidden_scroll}
            >
              <NoteList
                notes={notes}
                isLoading={isLoadingNotes}
                selectedNoteId={selectedNote?.id}
                onClickNote={onSelectNote}
              />
            </ScrollContainer>
            )
        }
    </div>
  );
});

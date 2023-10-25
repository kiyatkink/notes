import { FC, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { NoteList } from 'entities/Note';
import { NoteFilters } from 'features/NoteFilters';
import { AppButton, AppButtonSizes, AppButtonThems } from 'shared/ui/AppButton/AppButton';
import { useDebounce } from 'shared/lib/hooks/useDebounc/useDebounce';
import { ScrollContainer } from 'shared/ui/ScrollContainer/ScrollContainer';
import { useDispatch, useSelector } from 'react-redux';
import { Text, TextThemes } from 'shared/ui/Text/Text';
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
}
export const NotesSidebar: FC<NotesSidebarProps> = (props) => {
  const { className } = props
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
      >
        Создать заметку
      </AppButton>
      <NoteFilters updateNoteList={updateNoteList} />
      {
        errorNotesFetch
          ? <Text title={errorNotesFetch} theme={TextThemes.ERROR} />
          : (
            <ScrollContainer
              infinityScrollCallback={infinityScrollCallback}
              className={cls.hidden_scroll}
            >
              {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
              <NoteList
                notes={notes}
                isLoading={isLoadingNotes}
                selectedNoteId="3"
                onClickNote={(note) => { console.log(note.id) }}
              />
            </ScrollContainer>
            )
        }
    </div>
  );
};

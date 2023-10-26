import {
  FC, memo, useCallback,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppInput, AppInputSize } from 'shared/ui/AppInput/AppInput';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'shared/ui/Select/Select';
import cls from './NoteFilters.module.scss'
import {
  getNoteFiltersOrder,
  getNoteFiltersSearch,
} from '../../model/selectors/noteFiltersSelectors/noteFiltersSelectors';
import { noteFiltersActions } from '../../model/slice/noteFiltersSlice/noteFiltersSlice';
import { OrderType } from '../../model/types/NoteFiltersSchema';

interface NoteFiltersProps {
    className?: string
    updateNoteList: () => void
}

const orderOptions = [
  {
    name: 'убыванию даты',
    value: 'desk',
  },
  {
    name: 'возрастанию даты',
    value: 'ask',
  },
]

export const NoteFilters: FC<NoteFiltersProps> = memo((props: NoteFiltersProps) => {
  const { className, updateNoteList } = props
  const dispatch = useDispatch()

  const order = useSelector(getNoteFiltersOrder)
  const search = useSelector(getNoteFiltersSearch)

  const changeSearch = useCallback((value: string) => {
    dispatch(noteFiltersActions.changeSearch(value))
    updateNoteList()
  }, [dispatch, updateNoteList])

  const changeOrder = useCallback((value: string) => {
    dispatch(noteFiltersActions.changeOrder(value as OrderType))
    updateNoteList()
  }, [dispatch, updateNoteList])

  return (
    <div className={classNames(cls.NoteFilters, {}, [className])}>
      <AppInput placeholder="Поиск" onChange={changeSearch} value={search} size={AppInputSize.L} />
      <Select placeholder="Сортировать по" onChange={changeOrder} options={orderOptions} value={order} />
    </div>
  );
});

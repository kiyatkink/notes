import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize, TextThemes } from 'shared/ui/Text/Text';
import cls from './NoteListItem.module.scss'

interface NoteListItemProps {
    className?: string
    title: string,
    text: string
    selected?: boolean,
    onSelectNote: () => void
}

export const NoteListItem: FC<NoteListItemProps> = memo((props: NoteListItemProps) => {
  const {
    className, title, text, selected = false, onSelectNote,
  } = props

  return (
    <div
      role="presentation"
      onClick={onSelectNote}
      className={classNames(cls.NoteListItem, { [cls.selected]: selected }, [className])}
    >
      <Text title={title} size={TextSize.M} theme={selected ? TextThemes.INVERTED : TextThemes.PRIMARY} />
      <Text text={text} size={TextSize.M} theme={selected ? TextThemes.INVERTED : TextThemes.PRIMARY} />
    </div>
  );
});

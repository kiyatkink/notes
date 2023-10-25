import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './NoteEditor.module.scss'

interface NoteEditorProps {
    className?: string
}

export const NoteEditor: FC<NoteEditorProps> = (props) => {
  const { className } = props

  return (
    <div className={classNames(cls.NoteEditor, {}, [className])} />
  );
};

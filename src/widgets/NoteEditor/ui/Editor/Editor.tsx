import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Note } from 'entities/Note';
import { AppInput, AppInputSize } from 'shared/ui/AppInput/AppInput';
import { AppTextarea, AppTextareaSize } from 'shared/ui/AppTextarea/AppTextarea';
import cls from './Editor.module.scss'

interface EditorProps {
    className?: string
    note: Note,
    isEdit: boolean,
    changeTitle: (value: string) => void,
    changeText: (value: string) => void,
}

export const Editor: FC<EditorProps> = memo((props: EditorProps) => {
  const {
    className, note, isEdit, changeTitle, changeText,
  } = props

  return (
    <div className={classNames(cls.Editor, {}, [className])}>
      <AppInput
        placeholder="Заголовок"
        value={note.title}
        onChange={changeTitle}
        size={AppInputSize.XL}
        disabled={!isEdit}
      />
      <AppTextarea
        className={cls.height}
        value={note.text}
        onChange={changeText}
        size={AppTextareaSize.L}
        disabled={!isEdit}
        resize={false}
      />
    </div>
  );
});

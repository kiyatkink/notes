import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Note } from 'entities/Note';
import { ServerErrors } from 'shared/consts/serverErrorsMapper';
import { Text, TextAlign, TextThemes } from 'shared/ui/Text/Text';
import cls from './NoteEditor.module.scss'
import { EditorHeader } from '../EditorHeader/EditorHeader';
import { Editor } from '../Editor/Editor';

interface NoteEditorProps {
    className?: string
    note: Note,
    isSaveLoading: boolean,
    isEdit: boolean,
    onEdit: () => void,
    onDelete: () => void,
    onSave: () => void
    onCancel: () => void
    onChangeTitle: (value: string) => void
    onChangeText: (value: string) => void
    error: string | undefined
}

export const NoteEditor: FC<NoteEditorProps> = memo((props: NoteEditorProps) => {
  const {
    className,
    note,
    error,
    isEdit,
    isSaveLoading,
    onEdit,
    onDelete,
    onSave,
    onCancel,
    onChangeTitle,
    onChangeText,
  } = props

  return (
    <div className={classNames(cls.NoteEditor, {}, [className])}>
      <EditorHeader
        isEdit={isEdit}
        isLoading={isSaveLoading}
        onSave={onSave}
        onEdit={onEdit}
        onCancel={onCancel}
        onDelete={onDelete}
      />
      {
        error === ServerErrors.FAILED_TO_SAVE_NOTE
        || error === ServerErrors.FAILED_TO_DELETE_NOTE
           ? <Text text={error} theme={TextThemes.ERROR} textAlign={TextAlign.RIGHT} />
           : <></>
      }
      <Editor
        note={note}
        isEdit={isEdit}
        changeTitle={onChangeTitle}
        changeText={onChangeText}
      />
    </div>
  );
});

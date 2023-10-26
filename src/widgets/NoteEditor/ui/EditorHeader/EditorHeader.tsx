import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppButton, AppButtonSizes, AppButtonThems } from 'shared/ui/AppButton/AppButton';
import cls from './EditorHeader.module.scss'

interface EditorHeaderProps {
    className?: string
    isEdit: boolean,
    isLoading: boolean,
    onEdit: () => void,
    onDelete: () => void,
    onSave: () => void,
    onCancel: () => void
}

export const EditorHeader: FC<EditorHeaderProps> = memo((props: EditorHeaderProps) => {
  const {
    className, isEdit, onEdit, onDelete, onSave, onCancel, isLoading,
  } = props

  if (isEdit) {
    return (
      <div className={classNames(cls.EditorHeader, {}, [className])}>
        <AppButton
          size={AppButtonSizes.L}
          theme={AppButtonThems.OUTLINE}
          className={cls.padding_btn}
          onClick={onSave}
          disabled={isLoading}
        >
          Сохранить
        </AppButton>
        <AppButton
          size={AppButtonSizes.L}
          theme={AppButtonThems.OUTLINE_RED}
          className={cls.padding_btn}
          onClick={onCancel}
          disabled={isLoading}
        >
          Отмена
        </AppButton>
      </div>
    );
  }

  return (
    <div className={classNames(cls.EditorHeader, {}, [className])}>
      <AppButton
        size={AppButtonSizes.L}
        theme={AppButtonThems.OUTLINE}
        className={cls.padding_btn}
        onClick={onEdit}
        disabled={isLoading}
      >
        Редактировать
      </AppButton>
      <AppButton
        size={AppButtonSizes.L}
        theme={AppButtonThems.OUTLINE_RED}
        className={cls.padding_btn}
        onClick={onDelete}
        disabled={isLoading}
      >
        Удалить
      </AppButton>
    </div>
  );
});

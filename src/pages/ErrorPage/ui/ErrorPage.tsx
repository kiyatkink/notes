import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppButton, AppButtonThems } from 'shared/ui/AppButton/AppButton';
import cls from './ErrorPage.module.scss'

interface ErrorPageProps {
    className?: string
}

const ErrorPage: FC<ErrorPageProps> = memo((props: ErrorPageProps) => {
  const { className } = props
  const reloadHandler = () => {
    window.location.reload()
  }

  return (
    <div className={classNames(cls.ErrorPage, {}, [className])}>
      <p className={cls.Text}>Что-то пошло не так</p>
      <AppButton
        onClick={reloadHandler}
        theme={AppButtonThems.INVERTED}
        className={cls.BtnSize}
      >
        Перезагрузить страницу
      </AppButton>
    </div>
  );
});

export default ErrorPage

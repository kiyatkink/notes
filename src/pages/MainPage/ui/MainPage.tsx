import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { NotesSidebar } from 'widgets/NotesSidebar';
import { NoteEditor } from 'widgets/NoteEditor';
import cls from './MainPage.module.scss'

interface MainPageProps {
    className?: string
}

const MainPage: FC<MainPageProps> = (props) => {
  const { className } = props

  return (
    <div className={classNames(cls.MainPage, {}, [className])}>
      <NotesSidebar />
      <NoteEditor />
    </div>
  );
};

export default MainPage

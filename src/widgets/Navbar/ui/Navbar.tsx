import { classNames } from 'shared/lib/classNames/classNames';
import { FC, memo } from 'react';
import { ThemSwitcher } from 'features/ThemSwitcher';
import cls from './Navbar.module.scss';

export interface NavbarProps {
    classesNames?: string
}
export const Navbar: FC<NavbarProps> = memo((props: NavbarProps) => {
  const { classesNames } = props;

  return (
    <div className={classNames(cls.Navbar, {}, [classesNames])}>
      <div className={cls.LinkSection}>
        <ThemSwitcher className={cls.ThemSwitcher_size} />
      </div>
    </div>
  );
});

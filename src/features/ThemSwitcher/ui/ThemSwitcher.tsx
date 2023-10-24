import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppButton, AppButtonProps } from 'shared/ui/AppButton/AppButton';
import { Thems, useTheme } from 'shared/lib/theme';
import Moon from 'shared/assets/moon.svg';
import Sun from 'shared/assets/sun.svg';
import cls from './ThemSwitcher.module.scss';

interface ThemSwitcherProps extends AppButtonProps{
    className?: string
}
export const ThemSwitcher: FC<ThemSwitcherProps> = memo((props: ThemSwitcherProps) => {
  const { className, ...otherProps } = props;
  const { theme, toggleTheme } = useTheme();
  return (
    <AppButton
      className={classNames(cls.ThemSwitcher, {}, [className])}
      onClick={toggleTheme}
      {...otherProps}
    >
      { theme === Thems.DARK ? <Moon /> : <Sun /> }
    </AppButton>
  );
});

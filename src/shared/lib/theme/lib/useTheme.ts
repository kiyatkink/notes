import { useContext } from 'react';
import { ThemeContext, Thems } from './ThemeContext';
import { THEME_VALUE } from '../../../consts/localstorage';

export interface UseThemeResult {
    theme: Thems,
    toggleTheme: () => void
}
export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = theme === Thems.LIGHT ? Thems.DARK : Thems.LIGHT;
    localStorage.setItem(THEME_VALUE, newTheme);
    setTheme?.(newTheme);
  };

  return {
    theme: theme || Thems.LIGHT,
    toggleTheme,
  };
}

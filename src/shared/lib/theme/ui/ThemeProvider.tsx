import {
  FC, PropsWithChildren, useEffect, useMemo, useState,
} from 'react';
import {
  ThemeContext,
  Thems,
} from '../lib/ThemeContext';
import { THEME_VALUE } from '../../../consts/localstorage';

const defaultTheme = localStorage.getItem(THEME_VALUE) as Thems || Thems.LIGHT;
export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Thems>(defaultTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme])

  const defaultValue = useMemo(() => ({
    theme,
    setTheme,
  }), [theme]);

  return (
    <ThemeContext.Provider value={defaultValue}>
      { children }
    </ThemeContext.Provider>
  );
};

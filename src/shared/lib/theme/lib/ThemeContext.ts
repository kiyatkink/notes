import { createContext, Dispatch, SetStateAction } from 'react';

export enum Thems {
    LIGHT = 'light',
    DARK = 'dark'
}
export interface ThemeContextProps {
    theme?: Thems,
    setTheme?: Dispatch<SetStateAction<Thems>>
}
export const ThemeContext = createContext<ThemeContextProps>({});

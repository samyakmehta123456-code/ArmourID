import React, { createContext, useContext } from 'react';
import { LIGHT_THEME } from '../theme/colors';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // App is locked strictly to Light Gray theme (#E5E7EB)
  const themeMode = 'light';
  const currentTheme = LIGHT_THEME;

  return (
    <ThemeContext.Provider value={{ theme: themeMode, colors: currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

import { createContext } from "react";

const ThemeContext = createContext(
    {
      currentTheme: 'light',
      setTheme: null,
    },
  );

export default ThemeContext;
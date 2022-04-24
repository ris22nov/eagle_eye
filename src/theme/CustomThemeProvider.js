import React, { useState } from 'react'
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import getTheme from './base';
import ThemeContext from '../context/ThemeContext';

const CustomThemeProvider = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children } = props

  // Read current theme from localStorage or maybe from an api
  const currentTheme = localStorage.getItem('appTheme') || 'light'

  // State to hold the selected theme name
  const [themeName, _setThemeName] = useState(currentTheme)

  // Retrieve the theme object by theme name
  const theme = getTheme(themeName)

  // Wrap _setThemeName to store new theme names in localStorage
  const setThemeName = (name) => {
    localStorage.setItem('appTheme', name)
    _setThemeName(name)
  }

  const contextValue = {
    currentTheme: themeName,
    setTheme: setThemeName,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default CustomThemeProvider

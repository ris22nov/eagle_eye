import createTheme from '@mui/material/styles/createTheme';

export const dark = createTheme({
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 640,
        laptop: 1024,
        desktop: 1200,
      },
    },
    palette: {
      mode: 'dark',
    },
  });
  
'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 16,
    h1: { fontWeight: 700, letterSpacing: '-0.02em' },
    h6: { fontWeight: 600, letterSpacing: '0.01em' },
    body1: {
      letterSpacing: '0.01em',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          /* This fixes the "Not supported" warning by providing all versions */
          WebkitTextSizeAdjust: '100%',
          MozTextSizeAdjust: '100%',
          msTextSizeAdjust: '100%',
          textSizeAdjust: '100%',
          /* Forces sharp edges on English characters */
          WebkitFontSmoothing: 'subpixel-antialiased',
          MozOsxFontSmoothing: 'auto',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          /* Tabular nums make English payroll data much clearer */
          fontVariantNumeric: 'tabular-nums',
          padding: '12px 8px',
        },
      },
    },
  },
});

export default theme;
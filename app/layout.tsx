import { Roboto } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Components/theme'; 
import { Viewport } from "next";
import "./globals.css";

// 1. This is the only font import you need. 
// It handles everything and is faster than @fontsource.
const roboto = Roboto({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '700'], 
  display: 'swap',
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* 2. Added subpixel-antialiased for sharper English text on mobile */}
      <body className={`${roboto.className} subpixel-antialiased`}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
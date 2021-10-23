import React from 'react';
import { ThemeProvider } from '../components/ThemeContext';
import { darkColors, lightColors } from '../styles/myColors';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = React.useState(darkColors);
  return (
    <ThemeProvider value={{ theme, setTheme }}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

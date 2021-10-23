import React from 'react';
import { ThemeProvider } from '../components/ThemeContext';
import { darkColors, lightColors } from '../styles/myColors';
import '../styles/globals.css';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = React.useState(darkColors);
  return (
    <ThemeProvider value={{ theme, setTheme }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;

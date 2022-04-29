import '../styles/globals.css';
import type { AppProps } from 'next/app';
// import { ThemeProvider } from 'next-themes';
import CommandBar from '../components/Kbar';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    // <ThemeProvider enableSystem defaultTheme="dark" attribute="class">
    <CommandBar>
      <Component {...pageProps} />
    </CommandBar>
    // </ThemeProvider>
  );
};

export default MyApp;

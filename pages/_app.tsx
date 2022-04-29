import '../styles/globals.css';
import type { AppProps } from 'next/app';
import CommandBar from '../components/Kbar';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <CommandBar>
      <Component {...pageProps} />
    </CommandBar>
  );
};

export default MyApp;

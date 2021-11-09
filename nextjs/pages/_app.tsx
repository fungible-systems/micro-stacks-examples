import type { AppProps } from 'next/app';
import 'modern-normalize/modern-normalize.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

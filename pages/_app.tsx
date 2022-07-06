import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { initServices } from './services';

function MyApp({ Component, pageProps }: AppProps) {
  initServices();
  return <Component {...pageProps} />
}

export default MyApp

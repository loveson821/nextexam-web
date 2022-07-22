import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { initServices } from './services';
import MainLayout from './components/MainLayout';

function MyApp({ Component, pageProps }: AppProps) {
  initServices();
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
    
}

export default MyApp

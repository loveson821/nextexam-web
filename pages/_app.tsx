import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { initServices } from './services';
import MainLayout from './components/MainLayout';
import { ReactNode } from 'react';
import type { Page } from '../types/page'

type Props = AppProps & {
  Component: Page
}

function MyApp({ Component, pageProps }: Props) {
  initServices();
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page)
  return getLayout(
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )

}

export default MyApp

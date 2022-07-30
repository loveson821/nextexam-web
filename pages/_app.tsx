import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { initServices } from '../services';
import MainLayout from '../components/MainLayout';
import { ReactNode } from 'react';
import type { Page } from '../types/page'
import { useRouter } from 'next/router';

type Props = AppProps & {
  Component: Page
}

function MyApp({ Component, pageProps }: Props) {
  initServices();
  var router = useRouter()
  var isPack = router.pathname.indexOf('pack') != -1
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page)
  if( isPack ){
    return getLayout(
        <Component {...pageProps} />
    )
  }
  return getLayout(
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )

}

export default MyApp

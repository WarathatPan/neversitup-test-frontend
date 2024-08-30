import { AppProps } from 'next/app';
import '../styles/globals.scss';
import Head from 'next/head';
import MainLayout from '@/layouts/Layout';

function MyTodoApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <Component {...pageProps} />
      </div>
    </MainLayout>
  );
}

export default MyTodoApp;
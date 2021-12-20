import Head from 'next/head';
import Navbar from './navbar';

export default function Layout({ children }) {
  return (
    <div>
      <Head>
      <title>IEBC Diaspora</title>
      <meta name="description" content="Official IEBC diaspora portal." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
      <Navbar />
      <div className='page-content'>
        {children}
      </div>
    </div>
  )
}

import '../styles/globals.css';
import { RecoilRoot } from 'recoil';
import Layout from '../components/layout';
import 'react-calendar/dist/Calendar.css';

function MyApp({ Component, pageProps: { ...pageProps } }) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  )
}

export default MyApp

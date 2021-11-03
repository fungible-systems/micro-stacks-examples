import { makeGetServerSideProps } from '@micro-stacks/nextjs';
import { Devtools } from '../components/devtools';
import { MainArea } from '../components/main-area';

import type { NextPage } from 'next';
import { Header } from '../components/header';

const Home: NextPage = () => {
  return (
    <div
      style={{
        padding: '32px',
      }}
    >
      <Header />
      <Devtools />
      <MainArea />
    </div>
  );
};

export const getServerSideProps = makeGetServerSideProps([
  'currentAccountBalances',
  'currentAccountTransactions',
  'currentAccountAssetsList',
]);

export default Home;

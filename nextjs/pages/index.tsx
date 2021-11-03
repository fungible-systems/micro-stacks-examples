import { makeGetServerSideProps } from '@micro-stacks/nextjs';
import { Devtools } from '../components/devtools';
import { MainArea } from '../components/main-area';

import type { NextPage } from 'next';
import { Header } from '../components/header';

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Devtools />
      <MainArea />
    </>
  );
};

export const getServerSideProps = makeGetServerSideProps([
  'currentAccountBalances',
  'currentAccountTransactions',
  'currentAccountAssetsList',
]);

export default Home;

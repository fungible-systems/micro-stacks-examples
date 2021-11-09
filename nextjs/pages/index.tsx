import { makeGetServerSideProps } from '@micro-stacks/nextjs';
import { Devtools } from '../components/devtools';
import { MainArea } from '../components/main-area';
import { Header } from '../components/header';
import { withMicroStacks } from '../common/with-micro-stacks';

import type { NextPage } from 'next';

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

export default withMicroStacks(Home);

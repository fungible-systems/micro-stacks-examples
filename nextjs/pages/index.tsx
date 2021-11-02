import { wrapWithMicroStacks, makeGetServerSideProps } from '@micro-stacks/nextjs';
import { Devtools } from '../components/devtools';
import { MainArea } from '../components/main-area';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      <Devtools />
      <MainArea />
    </>
  );
};

const withMicroStacks = wrapWithMicroStacks({
  authOptions: {
    appDetails: {
      name: 'test app',
      icon: 'icon',
    },
  },
});

export const getServerSideProps = makeGetServerSideProps(['currentAccountBalances']);

export default withMicroStacks(Home);

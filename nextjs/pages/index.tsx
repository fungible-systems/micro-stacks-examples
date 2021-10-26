import type { NextPage } from 'next';
import { resetSessionCookies } from '../common/cookies';
import { wrapWithMicroStacks } from '../common/wrap-with-micro-stacks';
import { useCurrentAccountBalances, useCurrentStxAddress } from 'micro-stacks/react';
import { SafeSuspense } from '../components/safe-suspense';
import { makeGetServerSideProps } from '../common/make-get-server-side-props';

const withMicroStacks = wrapWithMicroStacks({
  authOptions: {
    appDetails: {
      name: 'test app',
      icon: 'icon',
    },
    onSignOut() {
      resetSessionCookies();
    },
  },
});

const Component = () => {
  const [data] = useCurrentAccountBalances();
  return (
    <pre>
      <code>{JSON.stringify(data, null, '  ')}</code>
    </pre>
  );
};

const Home: NextPage = () => {
  const stxAddress = useCurrentStxAddress();
  if (!stxAddress) return null;
  return (
    <SafeSuspense fallback={<>loading</>}>
      <Component />
    </SafeSuspense>
  );
};

export const getServerSideProps = makeGetServerSideProps([
  'currentAccountTransactions',
  'currentAccountMempoolTransactions',
  'currentAccountNames',
]);

export default withMicroStacks(Home);

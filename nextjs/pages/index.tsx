import type { NextPage } from 'next';
import { resetSessionCookies } from '../common/cookies';
import { wrapWithMicroStacks } from '../common/wrap-with-micro-stacks';
import { useCurrentAccountBalances, useCurrentStxAddress } from 'micro-stacks/react';
import { SafeSuspense } from '../components/safe-suspense';
import { makeGetServerSideProps } from '../common/make-get-server-side-props';
import { WalletConnectButton } from '../components/wallet-connect-button';
import { Devtools } from '../components/devtools';
import { useNetwork } from 'micro-stacks/react';

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
  const { network } = useNetwork();
  const url = network.getInfoUrl();
  const [data] = useCurrentAccountBalances();

  return (
    <pre>
      <code>{JSON.stringify(data, null, '  ')}</code>
    </pre>
  );
};

const MainArea = () => {
  const stxAddress = useCurrentStxAddress();
  if (!stxAddress) return <WalletConnectButton />;
  return (
    <SafeSuspense fallback={<>loading</>}>
      <Component />
    </SafeSuspense>
  );
};
const Home: NextPage = () => {
  return (
    <>
      <Devtools />
      <MainArea />
    </>
  );
};

export const getServerSideProps = makeGetServerSideProps(['currentAccountBalances']);

export default withMicroStacks(Home);

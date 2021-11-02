import { useCurrentAccountBalances } from '@micro-stacks/query';
import { useCurrentStxAddress } from '@micro-stacks/react';
import { WalletConnectButton } from './wallet-connect-button';
import { SafeSuspense } from './safe-suspense';

const Component = () => {
  const [data] = useCurrentAccountBalances();
  return (
    <pre>
      <code>{JSON.stringify(data, null, '  ')}</code>
    </pre>
  );
};

export const MainArea = () => {
  const stxAddress = useCurrentStxAddress();
  if (!stxAddress) return <WalletConnectButton />;
  return (
    <SafeSuspense fallback={<>loading</>}>
      <Component />
    </SafeSuspense>
  );
};

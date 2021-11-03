import { useCurrentAccountAssetsList } from '@micro-stacks/query';
import { useCurrentStxAddress } from '@micro-stacks/react';
import { SafeSuspense } from './safe-suspense';

const Component = () => {
  const [data] = useCurrentAccountAssetsList();
  return (
    <pre>
      <code>{JSON.stringify(data, null, '  ')}</code>
    </pre>
  );
};

export const MainArea = () => {
  const stxAddress = useCurrentStxAddress();
  if (!stxAddress) return null;
  return (
    <SafeSuspense fallback={<>loading</>}>
      <Component />
    </SafeSuspense>
  );
};

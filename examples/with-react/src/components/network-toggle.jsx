import { useNetwork } from '@micro-stacks/react';

export const NetworkToggle = () => {
  const { isMainnet, setNetwork } = useNetwork();
  const networkMode = isMainnet ? 'mainnet' : 'testnet';

  return (
    <div>
      <h4>current network: {networkMode}</h4>
      <button onClick={() => setNetwork(isMainnet ? 'testnet' : 'mainnet')}>switch network</button>
    </div>
  );
};

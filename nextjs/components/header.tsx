import { WalletConnectButton } from './wallet-connect-button';

export function Header() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <h1>micro-stacks/nextjs</h1>
      <WalletConnectButton />
    </div>
  );
}

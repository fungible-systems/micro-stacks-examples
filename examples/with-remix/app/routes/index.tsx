import { WalletConnectButton } from '~/components/wallet-connect-button';
import { UserCard } from '~/components/user-card';

export default function Index() {
  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        lineHeight: '1.4',
      }}
    >
      <h1>Welcome to Remix + micro-stacks</h1>
      <WalletConnectButton />
      <UserCard />
    </div>
  );
}

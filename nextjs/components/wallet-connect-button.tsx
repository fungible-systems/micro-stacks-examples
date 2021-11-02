import { useAuth } from '@micro-stacks/react';

export const WalletConnectButton = () => {
  const { isSignedIn, handleSignIn, handleSignOut, isLoading } = useAuth();
  return (
    <button onClick={isSignedIn ? () => handleSignOut() : () => handleSignIn({})}>
      {isLoading ? 'Loading...' : isSignedIn ? 'Sign out' : 'Connect Stacks Wallet'}
    </button>
  );
};

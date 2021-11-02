import { useAuth, useAuthOptions } from '@micro-stacks/react';

export const WalletConnectButton = () => {
  const { isSignedIn, handleSignIn, handleSignOut, isLoading } = useAuth();
  console.log(useAuthOptions());
  return (
    <button onClick={isSignedIn ? () => handleSignOut() : () => handleSignIn({})}>
      {isLoading ? 'Loading...' : isSignedIn ? 'Sign out' : 'Connect Stacks Wallet'}
    </button>
  );
};

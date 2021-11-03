import { useAuth } from '@micro-stacks/react';

export const WalletConnectButton = ({
  label = 'Connect Stacks Wallet',
  loadingLabel = 'Loading...',
  signedInLabel = 'Sign out',
}) => {
  const { isSignedIn, handleSignIn, handleSignOut, isLoading } = useAuth();
  return (
    <button
      style={{
        all: 'unset',
        background: 'black',
        color: 'white',
        padding: '10px',
        borderRadius: '16px',
      }}
      onClick={isSignedIn ? () => handleSignOut() : () => handleSignIn()}
    >
      {isLoading ? loadingLabel : isSignedIn ? signedInLabel : label}
    </button>
  );
};

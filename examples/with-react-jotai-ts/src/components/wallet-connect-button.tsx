import { useAuthState } from '@micro-stacks/jotai';

export const WalletConnectButton = () => {
  const { openAuthRequest, isRequestPending, signOut, isSignedIn } = useAuthState();
  const label = isRequestPending ? 'Loading...' : isSignedIn ? 'Sign out' : 'Connect Stacks wallet';
  return (
    <button
      onClick={() => {
        if (isSignedIn) void signOut();
        else void openAuthRequest();
      }}
    >
      {label}
    </button>
  );
};

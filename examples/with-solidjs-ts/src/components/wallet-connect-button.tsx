import { useAuth } from '@micro-stacks/solidjs';
import { Show } from 'solid-js';

export const WalletConnectButton = () => {
  const { openAuthRequest, signOut, isRequestPending, isSignedIn } = useAuth();

  const label = (
    <Show
      when={isRequestPending()}
      fallback={
        <Show
          when={!isSignedIn()}
          fallback={'Sign out'}
        >
          Connect Stacks Wallet
        </Show>
      }
    >
      Loading...
    </Show>
  );
  return (
    <button
      onClick={() => {
        if (isSignedIn()) void signOut();
        else void openAuthRequest();
      }}
    >
      {label}
    </button>
  );
};

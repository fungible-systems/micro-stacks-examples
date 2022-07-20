import { useNetwork } from '@micro-stacks/solidjs';
import { Show } from 'solid-js';

export const NetworkToggle = () => {
  const { isMainnet, setNetwork } = useNetwork();
  return (
    <details>
      <summary>
        Current network:{' '}
        <Show
          when={isMainnet()}
          fallback={'testnet'}
        >
          mainnet
        </Show>
      </summary>
      <button onClick={() => setNetwork(isMainnet() ? 'testnet' : 'mainnet')}>
        Toggle network
      </button>
    </details>
  );
};

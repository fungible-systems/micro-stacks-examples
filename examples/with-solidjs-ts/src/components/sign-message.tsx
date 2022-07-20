import { useOpenSignMessage, useAuth } from '@micro-stacks/solidjs';
import { createSignal, Show } from 'solid-js';
import type { SignatureData } from 'micro-stacks/connect';

export const SignMessageComponent = () => {
  const { isSignedIn } = useAuth();
  const { openSignMessage, isRequestPending } = useOpenSignMessage();

  const [payload, setPayload] = createSignal(null as SignatureData | null);
  const [message, setMessage] = createSignal('');

  const onClick = async () => {
    await openSignMessage({
      message: message(),
      onFinish: walletResponse => {
        setPayload(walletResponse);
      },
    });
  };

  return (
    <Show when={isSignedIn()}>
      <details>
        <summary>Sign a messge!</summary>
        <div
          style={{
            display: 'grid',
            gap: '20px',
          }}
        >
          <input
            style={{ display: 'block' }}
            onChange={e => setMessage(e.currentTarget.value)}
          />
          <button onClick={onClick}>{isRequestPending() ? 'Loading...' : 'Sign message'}</button>
          <code>
            <pre>{JSON.stringify(payload(), null, 2)}</pre>
          </code>
        </div>
      </details>
    </Show>
  );
};

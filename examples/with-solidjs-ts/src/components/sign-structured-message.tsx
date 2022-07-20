import { useOpenSignStructuredMessage, useAuth } from '@micro-stacks/solidjs';
import { createSignal, Show } from 'solid-js';
import { tupleCV, stringAsciiCV } from 'micro-stacks/clarity';
import type { SignatureData } from 'micro-stacks/connect';

export const SignStructuredMessageComponent = () => {
  const { isSignedIn } = useAuth();
  const { openSignStructuredMessage, isRequestPending } = useOpenSignStructuredMessage();

  const [payload, setPayload] = createSignal(null as SignatureData | null);
  const [value, setValue] = createSignal('');

  const message = () =>
    tupleCV({
      message: stringAsciiCV(value()),
    });

  const onClick = async () => {
    await openSignStructuredMessage({
      message: message(),
      onFinish: walletResponse => {
        setPayload(walletResponse);
      },
    });
  };

  return (
    <Show when={isSignedIn()}>
      <details>
        <summary>Sign a structured messge!</summary>
        <div
          style={{
            display: 'grid',
            gap: '20px',
          }}
        >
          <input
            style={{ display: 'block' }}
            onChange={e => setValue(e.currentTarget.value)}
          />
          <button onClick={onClick}>{isRequestPending() ? 'Loading...' : 'Sign message'}</button>
          <code
            style={{
              'max-width': '400px',
              overflow: 'scroll',
              'text-align': 'left',
            }}
          >
            <pre>{JSON.stringify(payload(), null, 2)}</pre>
          </code>
        </div>
      </details>
    </Show>
  );
};

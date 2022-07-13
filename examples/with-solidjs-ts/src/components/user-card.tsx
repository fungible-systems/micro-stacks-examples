import { useAccount } from '@micro-stacks/solidjs';
import { Show } from 'solid-js';

export const UserCard = () => {
  const { stxAddress } = useAccount();
  return (
    <div class={'user-card'}>
      <Show
        when={stxAddress()}
        fallback={<h3>No active session</h3>}
      >
        <h3>{stxAddress()}</h3>
      </Show>
    </div>
  );
};

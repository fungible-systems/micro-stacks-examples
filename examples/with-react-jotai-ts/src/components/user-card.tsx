import { useAccountState } from '@micro-stacks/jotai';

export const UserCard = () => {
  const { stxAddress } = useAccountState();
  if (!stxAddress)
    return (
      <div className={'user-card'}>
        <h3>No active session</h3>
      </div>
    );
  return (
    <div className={'user-card'}>
      <h3>{stxAddress}</h3>
    </div>
  );
};

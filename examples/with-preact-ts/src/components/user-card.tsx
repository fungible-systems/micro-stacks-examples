import { useAccount } from '@micro-stacks/react';

export const UserCard = () => {
  const { stxAddress } = useAccount();
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

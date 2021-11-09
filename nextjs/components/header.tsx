import { WalletConnectButton } from './wallet-connect-button';
import { SpaceBetween, Text } from '@nelson-ui/react';

export function Header() {
  return (
    <SpaceBetween p={'$extra-loose'}>
      <Text>micro-stacks/nextjs</Text>
      <WalletConnectButton />
    </SpaceBetween>
  );
}

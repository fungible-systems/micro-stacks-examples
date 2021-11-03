import { useAuth } from '@micro-stacks/react';
import { Box } from '@nelson-ui/react';

export const WalletConnectButton = ({
  label = 'Connect Stacks Wallet',
  loadingLabel = 'Loading...',
  signedInLabel = 'Sign out',
}) => {
  const { isSignedIn, handleSignIn, handleSignOut, isLoading } = useAuth();
  return (
    <Box
      as="button"
      backgroundColor={'$surface-contrast'}
      color={'$text-onContrast'}
      border={0}
      px={'$base'}
      py={'$tight'}
      borderRadius={'$medium'}
      onClick={isSignedIn ? () => handleSignOut() : () => handleSignIn()}
    >
      {isLoading ? loadingLabel : isSignedIn ? signedInLabel : label}
    </Box>
  );
};

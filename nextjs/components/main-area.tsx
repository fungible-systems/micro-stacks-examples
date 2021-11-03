import { useCurrentAccountBalances } from '@micro-stacks/query';
import { SafeSuspense } from './safe-suspense';
import { Box, SpaceBetween, Stack, Text } from '@nelson-ui/react';
import { useAuth } from '@micro-stacks/react';
import { WalletConnectButton } from './wallet-connect-button';

const Balances = () => {
  const [{ stx, non_fungible_tokens }] = useCurrentAccountBalances();
  return (
    <Box width="100%" textAlign="left">
      <Text>Balances</Text>
      <Stack>
        {Object.keys(stx).map((key: any) => (
          <SpaceBetween key={key}>
            <Text>{key}</Text>
            <Text>{(stx as any)[key]}</Text>
          </SpaceBetween>
        ))}
        {Object.keys(non_fungible_tokens).map(key => (
          <SpaceBetween key={key}>
            <Text>{key}</Text>
            <Text>{non_fungible_tokens[key].count}</Text>
          </SpaceBetween>
        ))}
      </Stack>
    </Box>
  );
};

export const MainArea = () => {
  const { isSignedIn } = useAuth();
  return (
    <Stack justifyContent={'center'} alignItems={'center'} textAlign={'center'}>
      <Text maxWidth={'20ch'} variant={'Display01'}>
        Welcome to micro-stacks & next.js
      </Text>
      <Stack isInline as="main" maxWidth={'960px'} width="100%">
        {isSignedIn ? (
          <SafeSuspense fallback={<>loading...</>}>
            <Balances />
          </SafeSuspense>
        ) : (
          <Box mx="auto">
            <WalletConnectButton />
          </Box>
        )}
      </Stack>
    </Stack>
  );
};

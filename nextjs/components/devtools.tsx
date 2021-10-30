import React from 'react';
import { useAtomValue } from 'jotai/utils';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClientAtom } from 'jotai-query-toolkit';

export const DevtoolsPanel = () => {
  const queryClient = useAtomValue(queryClientAtom);
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export const Devtools = () => (process.env.NODE_ENV === 'production' ? null : <DevtoolsPanel />);

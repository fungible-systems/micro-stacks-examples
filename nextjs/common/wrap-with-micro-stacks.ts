import { AuthOptions, defaultStorageAdapter } from 'micro-stacks/connect';
import { setSessionCookies } from './cookies';
import { NextPage } from 'next';
import { withInitialQueryData } from 'jotai-query-toolkit/nextjs';
import { AppProviderAtomBuilder, buildMicroStacksAtoms } from 'micro-stacks/react';

export function wrapWithMicroStacks(options: AppProviderAtomBuilder) {
  const authOptions: AuthOptions = {
    ...options.authOptions,
    onFinish(payload) {
      options?.authOptions?.onFinish?.(payload);
      setSessionCookies(payload);
    },
  };
  return (page: NextPage) =>
    withInitialQueryData(
      page,
      buildMicroStacksAtoms({
        authOptions,
        network: options.network,
        storageAdapter: options.storageAdapter || defaultStorageAdapter,
      })
    );
}

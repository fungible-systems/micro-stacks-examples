import { AuthOptions, defaultStorageAdapter } from 'micro-stacks/connect';
import { setSessionCookies } from './cookies';
import { AppProviderAtomBuilder } from '@micro-stacks/react';
import { buildMicroStacksAtoms } from '@micro-stacks/nextjs';
import { useGetProviderInitialValues } from './test.hook';

export const useMicroStacks = (
  options: AppProviderAtomBuilder,
  props: Record<string, unknown> = {}
) => {
  const authOptions: AuthOptions = {
    ...options.authOptions,
    onFinish(payload) {
      options?.authOptions?.onFinish?.(payload);
      setSessionCookies(payload);
    },
  };
  return useGetProviderInitialValues(
    props,
    buildMicroStacksAtoms({
      authOptions,
      network: options.network,
      storageAdapter: options.storageAdapter || defaultStorageAdapter,
    })
  );
};

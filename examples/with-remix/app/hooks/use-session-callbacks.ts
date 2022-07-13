import { useFetcher } from '@remix-run/react';
import { useCallback } from 'react';

export const useSessionCallbacks = () => {
  const fetcher = useFetcher();

  /**
   * Session callback
   *
   * This function will pass the dehydrated state of the micro-stacks client
   * to the /api/session/save endpoint via a Remix Action.
   *
   */
  const onPersistState = useCallback(
    async (dehydatedState: string) => {
      const data = new FormData();
      data.set('dehydratedState', dehydatedState);
      await fetcher.submit(data, {
        method: 'post',
        action: '/api/session/save',
      });
    },
    [fetcher]
  );

  /**
   * Sign out callback
   *
   * This function will destroy a session by sending a POST request to
   * /api/session/destroy.
   */
  const onSignOut = useCallback(async () => {
    await fetcher.submit(null, {
      method: 'post',
      action: '/api/session/destroy',
    });
  }, [fetcher]);

  return {
    onPersistState,
    onSignOut,
  };
};

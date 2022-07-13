import { getSession, saveSession } from '~/common/session.server';
import type { ActionFunction } from '@remix-run/node';

export const action: ActionFunction = async ({ request }) => {
  const [session, data] = await Promise.all([getSession(request), request.formData()]);

  const dehydratedState = data.get('dehydratedState') as string | undefined;

  if (dehydratedState) {
    await session.set('dehydratedState', dehydratedState);
    return saveSession(session);
  }
  return null;
};

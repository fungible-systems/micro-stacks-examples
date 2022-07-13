import type { ActionFunction } from '@remix-run/node';
import { destroySession, getSession } from '~/common/session.server';

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request);
  return destroySession(session);
};

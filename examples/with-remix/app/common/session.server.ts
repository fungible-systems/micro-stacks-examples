import type { Session } from '@remix-run/server-runtime';
import { createCookieSessionStorage, json } from '@remix-run/node';

// for prod, def change this to an ENV var
const DEFAULT_SECRET = 'this_is_a_long_password';

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    maxAge: 0,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SECRET ?? DEFAULT_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function saveSession(session: Session) {
  return json(null, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 7,
      }),
    },
  });
}

export async function destroySession(session: Session) {
  return json(null, {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}

export async function getSession(request: Request) {
  const cookie = request.headers.get('Cookie');
  return sessionStorage.getSession(cookie);
}

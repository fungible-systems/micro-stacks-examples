import type { LoaderFunction, MetaFunction } from '@remix-run/server-runtime';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { json } from '@remix-run/server-runtime';

// micro-stacks
import * as MicroStacks from '@micro-stacks/react';
import { cleanDehydratedState } from '@micro-stacks/client';
import { useSessionCallbacks } from '~/hooks/use-session-callbacks';
import { getSession } from '~/common/session.server';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);
  return json({
    // IMPORTANT
    // because this data gets sent to the client,
    // we want to clean the dehydrated state.
    // This function will remove any instance of the `appPrivateKey`
    // from the data that gets sent to the client.
    dehydratedState: cleanDehydratedState(session.get('dehydratedState')),
  });
};

export default function App() {
  const { onPersistState, onSignOut } = useSessionCallbacks();
  const data = useLoaderData<{ dehydratedState: string | undefined }>();

  // only send it if we're on the server
  // the client will hydrate from localStorage
  const IS_SSR = typeof document === 'undefined';
  const dehydratedState = IS_SSR ? data.dehydratedState : undefined;

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <MicroStacks.ClientProvider
          appName={'Remix + micro-stacks'}
          appIconUrl={'/icon.png'}
          dehydratedState={dehydratedState}
          onPersistState={onPersistState}
          onSignOut={onSignOut}
        >
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </MicroStacks.ClientProvider>
      </body>
    </html>
  );
}

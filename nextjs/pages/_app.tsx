import { wrapWithMicroStacks } from '@micro-stacks/nextjs';
import type { AppProps } from 'next/app';
import 'modern-normalize/modern-normalize.css';

const withMicroStacks = wrapWithMicroStacks({
  authOptions: {
    appDetails: {
      name: 'test app',
      icon: 'icon',
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const WrappedComponent = withMicroStacks(Component);
  return <WrappedComponent {...pageProps} />;
}

export default MyApp;

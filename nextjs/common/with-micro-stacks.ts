import { wrapWithMicroStacks } from '@micro-stacks/nextjs';

export const withMicroStacks = wrapWithMicroStacks({
  authOptions: {
    appDetails: {
      name: 'test app',
      icon: 'icon',
    },
  },
});

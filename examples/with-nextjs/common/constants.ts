// this is something specific to this deployment, using something like NEXT_PUBLIC_VERCEL_URL will be the deployment
// url that vercel uses and ultimately proxies with any kind of domain assignment to, as such, the CORS requests will
// fail, even tho they are the same deployment. in your own apps you should do something similar if you know the fixed
// domain this app will be deployed to

export const APP_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://nextjs-example.micro-stacks.dev';

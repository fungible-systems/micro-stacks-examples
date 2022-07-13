import preactLogo from './assets/preact.svg';
import './app.css';

import * as MicroStacks from '@micro-stacks/react';
import { WalletConnectButton } from './components/wallet-connect-button.jsx';
import { UserCard } from './components/user-card.jsx';
import { Logo } from './components/ustx-logo.jsx';

function Contents() {
  return (
    <>
      <div className={'logos'}>
        <a href="https://micro-stacks.dev" target="_blank" className={'micro-stacks-logo'}>
          <Logo size={84} class="logo" />
        </a>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img src={preactLogo} class="logo preact" alt="Preact logo" />
        </a>
      </div>
      <h1>micro-stacks + Vite + Preact</h1>
      <div class="card">
        <UserCard />
        <WalletConnectButton />
        <p
          style={{
            display: 'block',
            marginTop: '40px',
          }}
        >
          Edit <code>src/app.jsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">Click on the micro-stacks, Vite, and Preact logos to learn more</p>
    </>
  );
}

export function App() {
  return (
    <MicroStacks.ClientProvider appName={'Preact + micro-stacks'} appIconUrl={preactLogo}>
      <Contents />
    </MicroStacks.ClientProvider>
  );
}

import logo from './logo.svg';
import styles from './App.module.css';

import { ClientContext, useCreateClient } from '@micro-stacks/solidjs';
import { WalletConnectButton } from './components/wallet-connect-button';
import { UserCard } from './components/user-card';

const App = () => {
  const client = useCreateClient({ appName: 'solid + micro-stacks', appIconUrl: '/' });
  return (
    <ClientContext.Provider value={client}>
      <div class={styles.App}>
        <header class={styles.header}>
          <img
            src={logo}
            class={styles.logo}
            alt="logo"
          />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <WalletConnectButton />
          <UserCard />
        </header>
      </div>
    </ClientContext.Provider>
  );
};

export default App;

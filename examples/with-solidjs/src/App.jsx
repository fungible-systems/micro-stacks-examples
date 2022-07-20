import styles from './App.module.css';

import { ClientContext, useCreateClient } from '@micro-stacks/solidjs';
import { WalletConnectButton } from './components/wallet-connect-button';
import { UserCard } from './components/user-card';
import { SignMessageComponent } from './components/sign-message';
import { SignStructuredMessageComponent } from './components/sign-structured-message';
import { NetworkToggle } from './components/network-toggle';

const App = () => {
  const client = useCreateClient({ appName: 'solid + micro-stacks', appIconUrl: '/' });
  return (
    <ClientContext.Provider value={client}>
      <div class={styles.App}>
        <NetworkToggle />
        <UserCard />
        <WalletConnectButton />
        <SignMessageComponent />
        <SignStructuredMessageComponent />
      </div>
    </ClientContext.Provider>
  );
};

export default App;

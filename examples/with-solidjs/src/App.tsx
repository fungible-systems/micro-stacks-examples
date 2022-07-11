import type { Component } from "solid-js";
import logo from "./logo.svg";
import styles from "./App.module.css";

import {
  ClientContext,
  useMicroStacksContext,
  useAccountState,
  useAuthState,
  useCreateClient,
  useNetworkState,
} from "./common/store";
import { createStore } from "solid-js/store";

const Button = () => {
  const { openAuthRequest, signOut } = useAuthState();
  const { stxAddress } = useAccountState();
  const { isMainnet, setNetwork } = useNetworkState();
  const [value, setValue] = createStore({ v: "hello" });

  return (
    <div>
      {stxAddress() ? stxAddress() : "no session"}
      <button onClick={() => setNetwork(isMainnet() ? "testnet" : "mainnet")}>
        switch network
      </button>
      <button
        onClick={() => {
          console.log("hello");
          if (!stxAddress())
            openAuthRequest({
              onFinish: () => {
                console.log("hello");
              },
            });
          else signOut();
        }}
      >
        {value.v}
      </button>
    </div>
  );
};

const App: Component = () => {
  const client = useCreateClient({ appName: "solid", appIconUrl: "/" });
  return (
    <ClientContext.Provider value={client}>
      <div class={styles.App}>
        <header class={styles.header}>
          <img src={logo} class={styles.logo} alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <Button />
        </header>
      </div>
    </ClientContext.Provider>
  );
};

export default App;

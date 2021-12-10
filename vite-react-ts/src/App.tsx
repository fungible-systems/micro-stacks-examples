import { MicroStacksProvider, useAuth, useUser } from "@micro-stacks/react";
import { WalletConnectButton } from "./wallet-connect-button";

import logo from "./logo.svg";
import "./App.css";

const Contents = () => {
  const { isSignedIn } = useAuth();
  const userData = useUser();
  if (isSignedIn)
    return (
      <>
        <h1>Welcome!</h1>
        <h2>{userData.addresses?.mainnet}</h2>
        <br />
        <WalletConnectButton />
      </>
    );
  return (
    <>
      <h1>pls sign in</h1>
      <WalletConnectButton />
    </>
  );
};

function App() {
  return (
    <MicroStacksProvider
      authOptions={{
        appDetails: {
          name: "my cool app",
          icon: logo,
        },
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Contents />
      </div>
    </MicroStacksProvider>
  );
}

export default App;

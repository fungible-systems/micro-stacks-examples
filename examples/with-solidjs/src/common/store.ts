import { createContext, createSignal, onCleanup, useContext } from "solid-js";

import {
  Account,
  ClientConfig,
  ContractCallParams,
  ContractDeployParams,
  createClient,
  defaultStorage,
  getAccounts,
  getCurrentAccount,
  getDecentralizedID,
  getIdentityAddress,
  getNetwork,
  getStatus,
  getStxAddress,
  MicroStacksClient,
  Status,
  StatusKeys,
  StxTransferParams,
  TxType,
  watchAccounts,
  watchCurrentAccount,
  watchDecentralizedID,
  watchIdentityAddress,
  watchNetwork,
  watchStatus,
  watchStxAddress,
} from "@micro-stacks/client";
import { ChainID } from "micro-stacks/common";
import { SignedOptionsWithOnHandlers } from "micro-stacks/connect";
import { ClarityValue } from "micro-stacks/clarity";
import { Accessor } from "solid-js/types/reactive/signal";
import { StacksNetwork } from "micro-stacks/network";

/** ------------------------------------------------------------------------------------------------------------------
 *   Client context
 *  ------------------------------------------------------------------------------------------------------------------
 */

export const ClientContext = createContext<
  Accessor<MicroStacksClient> | undefined
>();

export function useCreateClient({
  client: clientProp,
  dehydratedState,
  appIconUrl,
  appName,
  network,
  storage = defaultStorage,
  onPersistState,
  onAuthentication,
  onSignOut,
}: ClientConfig & { client?: MicroStacksClient }) {
  const config = {
    appName,
    appIconUrl,
    dehydratedState,
    network,
    storage,
    onPersistState,
    onAuthentication,
    onSignOut,
  };

  const [client] = createSignal(createClient({ config, client: clientProp }));

  return client;
}

export const useMicroStacksContext = () => {
  const client = useContext(ClientContext);
  if (!client) {
    throw new Error(
      "No MicroStacksClient set, wrap your app in ClientContext.Provider to set one"
    );
  }
  return client;
};

/** ------------------------------------------------------------------------------------------------------------------
 *   store factory (helper function)
 *  ------------------------------------------------------------------------------------------------------------------
 */

type SubscriptionFn<V> = (
  setter: (value: V) => void,
  client: MicroStacksClient
) => () => void;
type GetterFn<V> = (client: MicroStacksClient) => V;

function stateHookFactory<V>(
  getter: GetterFn<V>,
  subscribe: SubscriptionFn<V>
): () => Accessor<V> {
  return () => {
    const client = useMicroStacksContext();
    const [state, setState] = createSignal<V>(getter(client()));

    const unsub = subscribe((v) => setState(() => v), client());

    onCleanup(unsub);

    return state;
  };
}

/** ------------------------------------------------------------------------------------------------------------------
 *  Store values
 *  ------------------------------------------------------------------------------------------------------------------
 */

export const useWatchStxAddress = stateHookFactory(
  getStxAddress,
  watchStxAddress
);
export const useWatchAccounts = stateHookFactory(getAccounts, watchAccounts);
export const useWatchCurrentAccount = stateHookFactory(
  getCurrentAccount,
  watchCurrentAccount
);
export const useWatchIdentityAddress = stateHookFactory(
  getIdentityAddress,
  watchIdentityAddress
);
export const useWatchNetwork = stateHookFactory(getNetwork, watchNetwork);
export const useWatchStatus = stateHookFactory(getStatus, watchStatus);
export const useWatchDecentralizedID = stateHookFactory(
  getDecentralizedID,
  watchDecentralizedID
);

/** ------------------------------------------------------------------------------------------------------------------
 *  Authentication (derived state)
 *  ------------------------------------------------------------------------------------------------------------------
 */

export const useAuthState = () => {
  const client = useMicroStacksContext();
  const stxAddress = useWatchStxAddress();
  const status = useWatchStatus();
  const isSignedIn: Accessor<boolean> = () => !!stxAddress();
  const isRequestPending: Accessor<boolean> = () =>
    status()[StatusKeys.Authentication] === Status.IsLoading;
  return {
    /**
     * actions
     */
    openAuthRequest: (
      params?: Parameters<ReturnType<typeof client>["authenticate"]>[0]
    ) => {
      const { authenticate } = client();
      return authenticate(params);
    },
    signOut: (params?: Parameters<ReturnType<typeof client>["signOut"]>[0]) =>
      client().signOut(params),
    /**
     * state
     */
    isSignedIn,
    isRequestPending,
  };
};

/** ------------------------------------------------------------------------------------------------------------------
 *  Account (derived state)
 *  ------------------------------------------------------------------------------------------------------------------
 */

interface UseAccountState {
  appPrivateKey: Accessor<string | null>;
  rawAddress: Accessor<Account["address"]>;
  identityAddress: Accessor<string | null>;
  decentralizedID: Accessor<string | null>;
  stxAddress: Accessor<string | null>;
  profileUrl: Accessor<string | null>;
}

export const useAccountState = (): UseAccountState => {
  const account = useWatchCurrentAccount();
  return {
    appPrivateKey: () => account().appPrivateKey ?? null,
    rawAddress: () => account().address ?? null,
    identityAddress: useWatchIdentityAddress(),
    decentralizedID: useWatchDecentralizedID(),
    stxAddress: useWatchStxAddress(),
    profileUrl: () => account().profile_url ?? null,
  };
};

/** ------------------------------------------------------------------------------------------------------------------
 *  Network (derived state)
 *  ------------------------------------------------------------------------------------------------------------------
 */

export const useNetworkState = () => {
  const client = useMicroStacksContext();
  const network = useWatchNetwork();

  const isMainnet: Accessor<boolean> = (): boolean =>
    network().chainId === ChainID.Mainnet;
  return {
    /**
     * actions
     */
    setNetwork: (network: "mainnet" | "testnet" | StacksNetwork) =>
      client().setNetwork(network),
    /**
     * state
     */
    network,
    isMainnet,
  };
};

/** ------------------------------------------------------------------------------------------------------------------
 *  Contract call (derived state)
 *  ------------------------------------------------------------------------------------------------------------------
 */

export const useOpenContractCallState = () => {
  const client = useMicroStacksContext();
  const status = useWatchStatus();

  const openContractCall = (params: ContractCallParams) =>
      client().signTransaction(TxType.ContractCall, {
        ...params,
        onFinish: (payload) => {
          params?.onFinish?.(payload);
        },
        onCancel: (error) => {
          params?.onCancel?.(error);
        },
      }),
    isRequestPending: Accessor<boolean> = () =>
      status()[StatusKeys.TransactionSigning] === Status.IsLoading;

  return {
    openContractCall,
    isRequestPending,
  };
};

/** ------------------------------------------------------------------------------------------------------------------
 *  Contract deploy (derived state)
 *  ------------------------------------------------------------------------------------------------------------------
 */
export const useOpenContractDeployState = () => {
  const client = useMicroStacksContext();
  const status = useWatchStatus();

  const openContractDeploy = (params: ContractDeployParams) =>
      client().signTransaction(TxType.ContractDeploy, {
        ...params,
        onFinish: (payload) => {
          params?.onFinish?.(payload);
        },
        onCancel: (error) => {
          params?.onCancel?.(error);
        },
      }),
    isRequestPending: Accessor<boolean> = () =>
      status()[StatusKeys.TransactionSigning] === Status.IsLoading;

  return {
    openContractDeploy,
    isRequestPending,
  };
};

/** ------------------------------------------------------------------------------------------------------------------
 *  Stx token transfer (derived state)
 *  ------------------------------------------------------------------------------------------------------------------
 */

export const useOpenStxTokenTransferState = () => {
  const client = useMicroStacksContext();
  const status = useWatchStatus();

  const openStxTokenTransfer = (params: StxTransferParams) =>
      client().signTransaction(TxType.TokenTransfer, {
        ...params,
        onFinish: (payload) => {
          params?.onFinish?.(payload);
        },
        onCancel: (error) => {
          params?.onCancel?.(error);
        },
      }),
    isRequestPending: Accessor<boolean> = () =>
      status()[StatusKeys.TransactionSigning] === Status.IsLoading;

  return {
    openStxTokenTransfer,
    isRequestPending,
  };
};

/** ------------------------------------------------------------------------------------------------------------------
 *  Sign message (derived state)
 *  ------------------------------------------------------------------------------------------------------------------
 */

export const useOpenSignMessageState = () => {
  const client = useMicroStacksContext();
  const status = useWatchStatus();

  const openSignMessage = (
      params: SignedOptionsWithOnHandlers<{ message: string }>
    ) =>
      client().signMessage({
        ...params,
        onFinish: (payload) => {
          params?.onFinish?.(payload);
        },
        onCancel: (error) => {
          params?.onCancel?.(error);
        },
      }),
    isRequestPending = () =>
      status()[StatusKeys.MessageSigning] === Status.IsLoading;

  return {
    openSignMessage,
    isRequestPending,
  };
};

/** ------------------------------------------------------------------------------------------------------------------
 *  Sign structured message (derived state)
 *  ------------------------------------------------------------------------------------------------------------------
 */

export const useOpenSignStructuredMessageState = () => {
  const client = useMicroStacksContext();
  const status = useWatchStatus();

  const openSignStructuredMessage = (
      params: SignedOptionsWithOnHandlers<{
        message: string | ClarityValue;
        domain?: {
          name?: string;
          version?: string;
          chainId?: ChainID;
        };
      }>
    ) =>
      client().signStructuredMessage({
        ...params,
        onFinish: (payload) => {
          params?.onFinish?.(payload);
        },
        onCancel: (error) => {
          params?.onCancel?.(error);
        },
      }),
    isRequestPending = () =>
      status()[StatusKeys.StructuredMessageSigning] === Status.IsLoading;

  return {
    openSignStructuredMessage,
    isRequestPending,
  };
};

/** ------------------------------------------------------------------------------------------------------------------
 */

import { createContext, Signal, useContext } from "solid-js";
import { MicroStacksClient } from "@micro-stacks/client";
import { Accessor } from "solid-js/types/reactive/signal";

export const ClientContext = createContext<
  Accessor<MicroStacksClient> | undefined
>();

export const useMicroStacksContext = () => {
  const client = useContext(ClientContext);
  if (!client) {
    throw new Error(
      "No MicroStacksClient set, wrap your app in ClientContext.Provider to set one"
    );
  }
  return client;
};

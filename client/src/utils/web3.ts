import { configureChains, createConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";

const CONTRACT_ADDRESS = "0xc3B0a24A2dE7600954a47D04063E909314255E46";

const metaMaskConnector = new InjectedConnector({
  chains: [goerli],
});

const connectors = {
  metamask: metaMaskConnector,
};

const { publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [publicProvider()]
);

const wagmiConfig = createConfig({
  publicClient,
  webSocketPublicClient,
  autoConnect: true,
  connectors: Object.values(connectors),
});

export { CONTRACT_ADDRESS, wagmiConfig, connectors };
export * from "./abi";

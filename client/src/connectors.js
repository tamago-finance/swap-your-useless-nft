import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

import MetamaskLogo from "./images/wallet-provider/metamask.png";
import WalletConnectLogo from "./images/wallet-provider/wallet-connect.svg";
import CoinbaseLogo from "./images/wallet-provider/coinbase.svg";
import ImTokenLogo from "./images/wallet-provider/imToken.jpeg";

import { POLYGON_RPC_SERVER, MAINNET_RPC_SERVER } from "./constants";

const RPC = {
  1: MAINNET_RPC_SERVER,
  42: "https://eth-kovan.alchemyapi.io/v2/6OVAa_B_rypWWl9HqtiYK26IRxXiYqER",
  137: POLYGON_RPC_SERVER,
  80001: "https://rpc-mumbai.matic.today",
};

const supportedChainIds = [1, 137];

export const injected = new InjectedConnector({ supportedChainIds });

export const walletconnect = new WalletConnectConnector({
  rpc: RPC,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 15000,
});

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: RPC[1],
  appName: "Tamago Finance",
});

export const Connectors = [
  {
    name: "MetaMask",
    connector: injected,
    img: MetamaskLogo,
  },
  {
    name: "imToken",
    connector: walletconnect,
    img: ImTokenLogo,
  },
  {
    name: "WalletConnect",
    connector: walletconnect,
    img: WalletConnectLogo,
  },
  {
    name: "Wallet Link",
    connector: walletlink,
    img: CoinbaseLogo,
  },
];

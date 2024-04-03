import {
  Chain,
  createPublicClient,
  createWalletClient,
  custom,
  http,
} from "viem";

export const publicClient = (chain: Chain, url: string | null = null) => {
  const client = createPublicClient({
    chain,
    transport: url === null ? http() : http(url),
  });

  return client;
};

export const walletClient = (chain: Chain) => {
  const client = createWalletClient({
    chain,
    transport: custom(window.ethereum),
  });

  return client;
};

export const publicClientMulti = (chain: Chain, url: string | null = null) => {
  const client = createPublicClient({
    batch: {
      multicall: true,
    },
    chain,
    transport: url === null ? http() : http(url),
  });

  return client;
};

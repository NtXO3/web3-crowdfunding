import { useAccount, useNetwork } from "wagmi";
import { goerli } from "wagmi/chains";

const useIsWrongNetwork = () => {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();

  return isConnected && chain?.id !== goerli.id;
};

export { useIsWrongNetwork };

import { CONTRACT_ADDRESS, contractAbi } from "src/utils/web3";
import { useContractRead } from "wagmi";
import { goerli } from "wagmi/chains";

const useCampaigns = () => {
  const campaignsData = useContractRead({
    address: CONTRACT_ADDRESS,
    chainId: goerli.id,
    abi: contractAbi,
    watch: true,
    functionName: "getCampaigns",
  });

  return campaignsData;
};

export { useCampaigns };

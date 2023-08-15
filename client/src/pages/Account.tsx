import { FunctionComponent } from "react";
import { ConnectWalletButton, DisplayCampaigns } from "src/components";
import { useCampaigns } from "src/hooks/useCampaigns";
import { useAccount } from "wagmi";
import { ReactComponent as MetaMaskIcon } from "src/assets/metamask.svg";
import { firstAndLast } from "src/utils";

const Account: FunctionComponent = () => {
  const { data: campaingsData, isLoading, error } = useCampaigns();
  const { isConnected, address } = useAccount();

  if (!isConnected || !address) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <ConnectWalletButton />
      </div>
    );
  }

  const userCampaigns = campaingsData?.filter(
    (campaign) => campaign.owner.toLowerCase() === address.toLowerCase()
  );

  return (
    <>
      <section id="info">
        <h2 className="font-semibold text-3xl mb-10">My Account</h2>
        <div className="flex items-center border-b border-gray-700 pb-10">
          <div className="sm:w-24 aspect-square w-20 mr-4 flex items-center justify-center bg-slate-600 rounded-full">
            <MetaMaskIcon className="sm:w-16 w-12" />
          </div>
          <div>
            <span className="text-gray-400 mb-1 font-semibold block">
              Your Wallet Address:
            </span>
            <p className="text-lg sm:text-xl uppercase">
              {firstAndLast(address)}
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="py-10">
          <h2 className="font-semibold text-3xl mb-10">My Campaigns</h2>
          <DisplayCampaigns
            isLoading={isLoading}
            errorMessage={error?.message}
            campaigns={userCampaigns}
            emptyStateMessage="You have not created any campaigns yet"
          />
        </div>
      </section>
    </>
  );
};

export default Account;

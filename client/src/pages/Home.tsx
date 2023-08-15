import { FunctionComponent } from "react";
import { useCampaigns } from "src/hooks/useCampaigns";
import { DisplayCampaigns } from "src/components";
import { CampaignSearch } from "src/components/CampaignSearch";

const Home: FunctionComponent = () => {
  const {
    data: campaigns,
    isLoading: isLoadingCampaigns,
    error: errorCampaigns,
  } = useCampaigns();

  const amountOfCampaigns = campaigns?.filter(
    (campaign) => !campaign.deleted
  ).length;

  return (
    <>
      <div className="sm:hidden mb-8">
        <CampaignSearch />
      </div>
      <h1 className="text-white text-2xl font-semibold mb-8">
        All Campaigns&nbsp;
        {campaigns ? `(${amountOfCampaigns})` : null}
      </h1>
      <DisplayCampaigns
        campaigns={campaigns}
        isLoading={isLoadingCampaigns}
        errorMessage={errorCampaigns?.message}
      />
    </>
  );
};

export default Home;

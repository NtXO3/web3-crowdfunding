import { FunctionComponent } from "react";
import { useSearchParams } from "react-router-dom";
import { CampaignType } from "src/types";
import { CampaignCard } from "../CampaignCard";

type DisplayCampaignsProps = {
  campaigns?: readonly CampaignType[];
  isLoading?: boolean;
  errorMessage?: string;
  emptyStateMessage?: string;
};

const DisplayCampaigns: FunctionComponent<DisplayCampaignsProps> = ({
  campaigns,
  isLoading,
  emptyStateMessage = "There are no campaigns yet. Be the first to create one!",
  errorMessage,
}) => {
  const [urlParams] = useSearchParams();
  const searchQuery = urlParams.get("search")?.split("%20") || [""];

  if (isLoading) {
    return (
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {new Array(9).fill(0).map((_, index) => (
          <CampaignCard key={`campaign.skeleton.${index}`} isLoading />
        ))}
      </div>
    );
  }

  if (errorMessage) {
    return (
      <p className="text-center font-light text-lg mt-8 text-red-500">
        {errorMessage}
      </p>
    );
  }

  if (!isLoading && !campaigns?.length) {
    return (
      <p className="text-center font-medium text-2xl text-gray-400 mt-12">
        {emptyStateMessage}
      </p>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8">
      {campaigns?.length
        ? campaigns
            .filter(
              (campaign) =>
                searchQuery.some(
                  (query) =>
                    campaign.title.toLowerCase().includes(query) ||
                    campaign.description.toLowerCase().includes(query)
                ) && !campaign.deleted
            )
            .map((campaign, index) => (
              <CampaignCard
                key={`${campaign.title}.${index}`}
                campaign={campaign}
                id={index}
              />
            ))
            .reverse()
        : null}
    </div>
  );
};

export { DisplayCampaigns };

import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { CampaignType } from "src/types";
import { formatEther } from "viem";
import { Skeleton } from "../Skeleton";

type CampaignCardProps =
  | {
      campaign: CampaignType;
      id: number;
    }
  | { isLoading: boolean };

const CampaignCard: FunctionComponent<CampaignCardProps> = (props) => {
  if ("isLoading" in props) {
    return (
      <div className="bg-slate-800 rounded-xl hover:scale-105 transition">
        <Skeleton className="w-full h-56" />
        <div className="p-6">
          <Skeleton className="w-24 h-6 mb-2" />

          <div className="mb-4">
            {new Array(3).fill(0).map((_, index) => (
              <Skeleton
                key={`campaign.skeleton.para.${index}`}
                maxWidth={`${100 - index * 8}%`}
                className="w-full h-5 leading-[0]"
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-8">
            <span className="text-gray-300">
              <Skeleton className="h-5 w-16" />
              <br />
              <Skeleton className="w-28 h-5" />
            </span>
            <span className="text-gray-300">
              <Skeleton className="h-5 w-16" />
              <br />
              <Skeleton className="w-28 h-5" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  const { campaign, id } = props;

  const daysLeft = Math.floor(
    (Number(campaign.deadline) - Date.now()) / 1000 / 60 / 60 / 24
  );

  return (
    <Link to={`/campaigns/${id}`}>
      <div className="bg-slate-800 h-full rounded-xl hover:scale-105 transition">
        <img
          className="w-full h-56 rounded-xl object-cover"
          src={campaign.image}
          alt={`${campaign.title} Banner`}
        />

        <div className="p-6">
          <h2 className="font-semibold text-lg sm:text-xl mb-2">
            {campaign.title}
          </h2>

          <p className="text-gray-400 font-light sm:text-base text-sm mb-4">
            {campaign.description.slice(0, 72)}...
          </p>
          <div className="grid grid-cols-2 gap-8">
            <span className="text-gray-300 sm:text-base text-sm">
              <strong>{formatEther(campaign.amountCollected)} Eth</strong>
              <br />
              Raised of {formatEther(campaign.target)} Eth
            </span>
            <span className="text-gray-300 sm:text-base text-sm">
              <strong className="mb-2">{Math.max(daysLeft, 0)}</strong>
              <br />
              Days Left
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export { CampaignCard };

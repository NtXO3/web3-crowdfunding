import { ChangeEvent, FunctionComponent, ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { UserIcon } from "src/components";
import { useCampaigns } from "src/hooks/useCampaigns";
import { formatEther, parseEther } from "viem";
import {
  mainnet,
  useAccount,
  useBalance,
  useContractWrite,
  useEnsName,
  useWaitForTransaction,
} from "wagmi";
import { FaEthereum } from "react-icons/fa";
import { debounce } from "debounce";
import {
  firstAndLast,
  formatAmount,
  formatAssetAmount,
  routePaths,
} from "src/utils";
import { contractAbi } from "src/utils/abi";
import { CONTRACT_ADDRESS } from "src/utils/web3";
import { PayButton } from "src/components/PayButton";
import { BiTrashAlt } from "react-icons/bi";
import { DeleteCampaignModal } from "src/modals/DeleteCampaignModal";

const DisplayValue: FunctionComponent<{
  value: string | number;
  label: string;
}> = ({ value, label }) => {
  return (
    <div className="bg-gray-800 flex flex-col md:h-auto h-28 rounded-md">
      <p className="flex-1 font-semibold text-lg sm:text-2xl flex justify-center items-center">
        {value}
      </p>
      <div className="bg-gray-700 text-center sm:text-base text-sm text-gray-400 py-2 rounded-b-md">
        <span>{label}</span>
      </div>
    </div>
  );
};

const InfoBlock: FunctionComponent<{ children: ReactNode; label: string }> = ({
  children,
  label,
}) => {
  return (
    <div className="mb-10">
      <span className="uppercase font-semibold block mb-4 text-lg">
        {label}
      </span>
      {children}
    </div>
  );
};

type CampaignInfoFormValues = {
  amount: string;
};

const CampaignInfo: FunctionComponent = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { data: campaigns } = useCampaigns();
  const {
    register,
    watch,
    handleSubmit,
    formState: { isValid },
    setValue,
  } = useForm<CampaignInfoFormValues>({ mode: "onChange" });
  const { address } = useAccount();
  const { data: balanceData } = useBalance({ address });

  const amount = watch("amount");
  const {
    data,
    writeAsync: fundCampaign,
    isLoading: isLoadingDonate,
  } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "donateToCampaign",
    value:
      amount && Boolean(amount.match(/^-?\d+(\.\d+)?$/))
        ? parseEther(amount)
        : BigInt(0),
    args: [id && id.match(/^\d+$/) ? BigInt(id) : BigInt(0)],
  });
  const { isLoading: isLoadingTransaction } = useWaitForTransaction({
    hash: data?.hash,
  });
  const currentCampaign = campaigns?.[Number(id)];
  const { data: ensName } = useEnsName({
    address: currentCampaign?.owner,
    chainId: mainnet.id,
  });
  const isOwner = currentCampaign?.owner === address;
  const isLoading = isLoadingDonate || isLoadingTransaction;

  if (!currentCampaign) {
    return <>No Campaign Found</>;
  }

  const daysLeft = Math.floor(
    (Number(currentCampaign.deadline) - Date.now()) / 1000 / 60 / 60 / 24
  );

  const totalCampaignsFromUser = campaigns.filter(
    (campaign) =>
      campaign.owner.toLowerCase() === currentCampaign.owner.toLowerCase() &&
      !campaign.deleted
  ).length;

  const onSubmit = async ({ amount }: CampaignInfoFormValues) => {
    if (!amount || Number.isNaN(amount) || !fundCampaign) return;

    try {
      await fundCampaign();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAmountChange = debounce(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      if (Number.isNaN(value)) {
        setValue("amount", "", { shouldValidate: true });
        return;
      }

      const formattedAmount = formatAmount(value, true);

      setValue("amount", formattedAmount, { shouldValidate: true });
    },
    800
  );

  const isOverMax =
    balanceData && Number(amount) > Number(balanceData.formatted);

  return (
    <>
      <Link
        className="mb-4 block text-lg font-medium text-gray-300 hover:text-white transition"
        to={routePaths.HOME}
      >
        → Back to home
      </Link>
      <div className="grid md:grid-cols-6 grid-cols-3 md:grid-rows-3 gap-8 mb-8">
        <figure className="md:col-span-5 col-span-3 md:row-span-3 h-96">
          <img
            className="object-cover rounded-xl h-full w-full"
            src={currentCampaign?.image}
          />
        </figure>
        <DisplayValue value={daysLeft} label="Days Left" />
        <DisplayValue
          value={formatEther(currentCampaign.amountCollected)}
          label={`Raised of ${formatEther(currentCampaign.target)} ETH`}
        />
        <DisplayValue
          value={currentCampaign.donations.length}
          label={`Total Donations`}
        />
      </div>
      <h1 className="text-3xl font-bold mb-16">{currentCampaign.title}</h1>
      <div className="lg:grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <InfoBlock label="Creator">
            <div className="flex">
              <UserIcon />
              <div className="ml-4 flex-1">
                <p className="font-semibold hyphens-auto whitespace-normal sm:text-base text-sm hidden sm:block">
                  {ensName || currentCampaign?.owner} {isOwner && "(You)"}
                </p>
                <p className="sm:hidden font-semibold">
                  {firstAndLast(currentCampaign?.owner)}
                </p>
                <span className="text-sm text-gray-400">
                  <strong className="text-gray-300">
                    {totalCampaignsFromUser}
                  </strong>{" "}
                  Campaigns
                </span>
              </div>
            </div>
          </InfoBlock>
          <InfoBlock label="Story">
            <p className="text-gray-400 font-light">
              {currentCampaign.description}
            </p>
          </InfoBlock>
          <InfoBlock label="Donations">
            {currentCampaign.donations.length > 0 ? (
              <ol className="list-decimal pl-4">
                {currentCampaign.donations.map((donation, index) => (
                  <li
                    key={`${donation}.${currentCampaign.donations[index]}.${index}`}
                    className="text-gray-400 font-light"
                  >
                    <div className="flex justify-between items-center">
                      <span className="hidden sm:block">
                        {currentCampaign.donators[index]}
                      </span>
                      <span className="sm:hidden relative group">
                        {firstAndLast(currentCampaign.donators[index])}
                        <span className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 bg-gray-950 px-2 py-1 -top-2 text-sm hyphens-auto -left-4 -translate-y-full">
                          {currentCampaign.donators[index]}
                        </span>
                      </span>
                      <span className="flex items-center text-base">
                        <FaEthereum className="mr-1" />
                        {formatEther(donation)}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-400 font-light">
                No one has donated to this campaign yet.
              </p>
            )}
          </InfoBlock>

          {isOwner && (
            <button
              onClick={() => setIsOpen(true)}
              className="text-gray-400 hover:text-red-500 flex items-center"
            >
              <BiTrashAlt className="text-2xl mr-1" />
              Delete Campaign
            </button>
          )}
        </div>

        {!isOwner && (
          <InfoBlock label="Fund">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg text-gray-300 text-center font-medium tracking-wide mb-6">
                Pledge Without Reward
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <div className="relative w-full mb-6">
                  <FaEthereum className="absolute left-2 top-1/2 -translate-y-1/2 text-lg" />
                  <input
                    className="w-full outline-none bg-transparent border-gray-700 h-12 text-lg pl-8 text-white border-2 rounded-md"
                    placeholder="0"
                    {...register("amount", {
                      required: true,
                      validate: {
                        greaterThanZero: (value) => Number(value) > 0,
                        notOverMax: (value) =>
                          balanceData &&
                          Number(value) <= Number(balanceData.formatted),
                      },
                      onChange: (e) => handleAmountChange(e),
                    })}
                  />
                  {isOverMax && (
                    <span className="text-red-400 absolute text-sm right-2 top-1/2 -translate-y-1/2">
                      Max: {formatAssetAmount(balanceData?.formatted)} ETH
                    </span>
                  )}
                </div>
                <div className="bg-gray-900 px-6 py-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-sm mb-2">
                    Back It Because You Believe In It.
                  </h4>
                  <p className="font-light text-gray-400 text-sm">
                    Support the project for no reward, just because it speaks to
                    you.
                  </p>
                </div>
                <PayButton
                  role="button"
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={!isValid}
                  isLoading={isLoading}
                >
                  Fund Campaign
                </PayButton>
              </form>
            </div>
          </InfoBlock>
        )}
      </div>

      {id && (
        <DeleteCampaignModal
          campaign={currentCampaign}
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          campaignId={id}
        />
      )}
    </>
  );
};

export default CampaignInfo;

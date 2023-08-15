import { debounce } from "debounce";
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input, TextArea } from "src/components";
import { PayButton } from "src/components/PayButton";
import { useCampaigns } from "src/hooks/useCampaigns";
import { formatAmount } from "src/utils";
import { CONTRACT_ADDRESS, contractAbi } from "src/utils/web3";
import { parseEther } from "viem";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";

const CreateCampaignFormKeys = {
  USER_NAME: "name",
  TITLE: "title",
  DESCRIPTION: "description",
  TARGET: "target",
  END_DATE: "endDate",
  IMAGE_URL: "imageUrl",
} as const;

type CreateCampaignFormType = {
  [CreateCampaignFormKeys.USER_NAME]: string;
  [CreateCampaignFormKeys.TITLE]: string;
  [CreateCampaignFormKeys.DESCRIPTION]: string;
  [CreateCampaignFormKeys.TARGET]: string;
  [CreateCampaignFormKeys.END_DATE]: Date;
  [CreateCampaignFormKeys.IMAGE_URL]: string;
};

const CreateCampaign: FunctionComponent = () => {
  const { register, handleSubmit, setValue, reset } =
    useForm<CreateCampaignFormType>();
  const [newCampaignId, setNewCampaignId] = useState<number | null>(null);
  const navigate = useNavigate();
  const { data: campaigns } = useCampaigns();
  const { address } = useAccount();
  const {
    data,
    writeAsync,
    isLoading: isLoadingCampaignCreate,
  } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "createCampaign",
  });
  const { isLoading: isLoadingTransaction, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleAmountChange = debounce(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const formattedAmount = formatAmount(value, true);

      setValue(CreateCampaignFormKeys.TARGET, formattedAmount, {
        shouldValidate: true,
      });
    },
    800
  );

  const onSubmit = async (data: CreateCampaignFormType) => {
    if (!address || !campaigns) return;

    setNewCampaignId(campaigns.length);

    await writeAsync({
      args: [
        address,
        data.title,
        data.description,
        parseEther(data.target),
        BigInt(new Date(data.endDate).valueOf()),
        data.imageUrl,
      ],
    });

    reset();
  };

  useEffect(() => {
    if (isSuccess && newCampaignId) {
      navigate(`/campaigns/${newCampaignId}`);
      setNewCampaignId(null);
    }
  }, [isSuccess, newCampaignId]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-10 py-8 bg-gray-800 rounded-2xl flex flex-col"
    >
      <h1 className="text-center bg-gray-700 min-w-[20rem] mb-10 rounded-md font-bold text-xl py-4 inline self-center mx-auto">
        Start a Campaign 🚀
      </h1>
      <div className="grid sm:grid-cols-2 gap-10 mb-8">
        <Input
          id={CreateCampaignFormKeys.USER_NAME}
          {...register(CreateCampaignFormKeys.USER_NAME, { required: true })}
          label="Your Name"
          placeholder="John Doe"
        />
        <Input
          id={CreateCampaignFormKeys.TITLE}
          {...register(CreateCampaignFormKeys.TITLE, { required: true })}
          label="Campaign Title"
          placeholder="My cool campaign"
        />
      </div>
      <TextArea
        id={CreateCampaignFormKeys.DESCRIPTION}
        {...register(CreateCampaignFormKeys.DESCRIPTION, { required: true })}
        label="Story"
        placeholder="Tell us why you're raising Eth for this cause"
      />
      <div className="bg-gradient-to-r from-emerald-300 to-green-400 w-full py-10 px-8 rounded-md my-8">
        <strong className="text-black font-semibold text-2xl">
          You will get 100% of the raised amount
        </strong>
      </div>

      <div className="grid sm:grid-cols-2 gap-10 mb-8">
        <Input
          {...register(CreateCampaignFormKeys.TARGET, {
            onChange: handleAmountChange,
            required: true,
          })}
          id={CreateCampaignFormKeys.TARGET}
          placeholder="1 ETH"
          label="Goal"
        />
        <Input
          type="date"
          {...register(CreateCampaignFormKeys.END_DATE, { required: true })}
          id={CreateCampaignFormKeys.END_DATE}
          placeholder="DD/MM/YYYY"
          label="End Date"
        />
      </div>
      <Input
        {...register(CreateCampaignFormKeys.IMAGE_URL, { required: true })}
        id={CreateCampaignFormKeys.IMAGE_URL}
        placeholder="Image Url"
        label="Image"
      />
      <div className="inline-block mx-auto mt-8">
        <PayButton
          variant="primary"
          type="submit"
          role="button"
          isLoading={isLoadingCampaignCreate || isLoadingTransaction}
        >
          Create Campaign
        </PayButton>
      </div>
    </form>
  );
};

export default CreateCampaign;

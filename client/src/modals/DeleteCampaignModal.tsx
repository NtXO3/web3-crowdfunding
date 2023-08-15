import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components";
import { Modal } from "src/components/Modal";
import { CampaignType } from "src/types";
import { CONTRACT_ADDRESS, contractAbi } from "src/utils/web3";
import { useContractWrite, useWaitForTransaction } from "wagmi";

type DeleteCampaignModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  campaignId: string;
  campaign: CampaignType;
};

const DeleteCampaignModal: FunctionComponent<DeleteCampaignModalProps> = ({
  isOpen,
  closeModal,
  campaignId,
  campaign,
}) => {
  const {
    data,
    writeAsync,
    isLoading: isLoadingDelete,
  } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "deleteCampaign",
    args: [BigInt(campaignId)],
  });
  const { isLoading: isLoadingTransaction, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  const navigate = useNavigate();

  const onDeleteCampaign = async () => {
    try {
      await writeAsync();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data?.hash && isSuccess) {
      navigate("/");
    }
  }, [isSuccess, data?.hash]);

  const isLoading = isLoadingDelete || isLoadingTransaction;

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} title="Delete Campaign">
      <p className="mb-8 font-light text-gray-400">
        Are you sure you want to delete this campaign? This action can not be
        done and after deleting this campaign you can not activate it anymore or
        receive any donations.
        <br />
        <br />
        You will delete the{" "}
        <strong className="font-bold">{campaign.title}</strong> Campaign
      </p>
      <div className="sm:grid sm:grid-cols-2 gap-10">
        <Button
          isLoading={isLoading}
          variant="warning"
          role="button"
          onClick={onDeleteCampaign}
        >
          Yes, delete this campaign
        </Button>
        <Button
          disabled={isLoading}
          variant="secondary"
          role="button"
          onClick={closeModal}
        >
          No, take me back
        </Button>
      </div>
    </Modal>
  );
};

export { DeleteCampaignModal };

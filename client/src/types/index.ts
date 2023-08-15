type AddressType = `0x${string}`;

type CampaignType = {
  owner: AddressType;
  title: string;
  description: string;
  target: bigint;
  deadline: bigint;
  amountCollected: bigint;
  image: string;
  deleted?: boolean;
};

export type { CampaignType };

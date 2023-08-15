import { CONTRACT_ADDRESS } from "./web3";

const routePaths = {
  HOME: "/",
  CREATE_CAMPAIGN: "/create-campaign",
  CAMPAIGN: "/campaigns/:id",
  ACCOUNT: "/account",
};

const externalRoutes = {
  CONTRACT: `https://goerli.etherscan.io/address/${CONTRACT_ADDRESS}`,
};

export { routePaths, externalRoutes };

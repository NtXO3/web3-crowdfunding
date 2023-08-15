import { FunctionComponent } from "react";
import { useAccount } from "wagmi";
import { Button } from "../Button";
import { ConnectWalletButton } from "../ConnectWalletButton";
import { AccountMenu } from "../AccountMenu";
import { routePaths } from "src/utils";
import { Logo } from "../Logo";
import { MobileMenu } from "../MobileMenu";
import { CampaignSearch } from "../CampaignSearch";

const Header: FunctionComponent = () => {
  const { isConnected } = useAccount();

  return (
    <header className="max-w-6xl w-full mx-auto h-24 gap-6 items-center flex flex-row-reverse justify-between">
      {isConnected ? (
        <div className="flex items-center">
          <div className="sm:block hidden">
            <Button
              role="link"
              href={routePaths.CREATE_CAMPAIGN}
              className="mr-4"
            >
              Create a Campaign
            </Button>
          </div>
          <AccountMenu />
        </div>
      ) : (
        <div className="sm:block hidden">
          <ConnectWalletButton />
        </div>
      )}
      <figure className="sm:hidden">
        <Logo />
      </figure>
      <div className="sm:hidden">
        <MobileMenu />
      </div>
      <div className="hidden sm:block flex-1">
        <CampaignSearch />
      </div>
    </header>
  );
};

export { Header };

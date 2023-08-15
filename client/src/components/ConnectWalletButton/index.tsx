import { FunctionComponent } from "react";
import { Button } from "..";
import { useConnect } from "wagmi";
import { ReactComponent as MetaMaskIcon } from "src/assets/metamask.svg";

const ConnectWalletButton: FunctionComponent<{ className?: string }> = ({
  className = "",
}) => {
  const { connect, connectors, isLoading } = useConnect();

  return (
    <Button
      role="button"
      type="button"
      onClick={() => connect({ connector: connectors[0] })}
      className={className}
      isLoading={isLoading}
    >
      <MetaMaskIcon className="w-8 mr-1" />
      Connect MetaMask
    </Button>
  );
};

export { ConnectWalletButton };

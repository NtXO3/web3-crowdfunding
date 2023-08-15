import { FunctionComponent } from "react";
import { useIsWrongNetwork } from "src/hooks/useIsWrongNetwork";
import { useAccount, useSwitchNetwork } from "wagmi";
import { Button, ConnectWalletButton } from "..";
import { goerli } from "wagmi/chains";
import { ButtonProps } from "../Button/types";

const PayButton: FunctionComponent<ButtonProps> = ({ className, ...props }) => {
  const isWrongNetwork = useIsWrongNetwork();
  const { isConnected } = useAccount();
  const { switchNetwork, isLoading: networkSwitchLoading } = useSwitchNetwork();

  if (!isConnected) return <ConnectWalletButton className={className} />;

  if (isWrongNetwork) {
    return (
      <Button
        onClick={() => switchNetwork?.(goerli.id)}
        variant="primary"
        type="button"
        role="button"
        isLoading={networkSwitchLoading}
        className={className}
      >
        Switch Network
      </Button>
    );
  }

  return <Button variant="primary" {...props} />;
};

export { PayButton };

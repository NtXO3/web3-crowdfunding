import { FunctionComponent } from "react";
import { useEnsAvatar, useEnsName } from "wagmi";

type UserIconProps = {
  address?: `0x${string}`;
};

const UserIcon: FunctionComponent<UserIconProps> = ({ address }) => {
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });

  return (
    <div className="w-12 h-12 flex-shrink-0 bg-indigo-500 rounded-full flex items-center justify-center">
      {ensAvatar ? (
        <img
          className="w-full rounded-full"
          src={ensAvatar}
          alt={`${address} avatar`}
        />
      ) : (
        <div className="bg-white rounded-full w-4 h-4" />
      )}
    </div>
  );
};

export { UserIcon };

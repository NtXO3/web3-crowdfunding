import { FunctionComponent } from "react";
import { MdCampaign } from "react-icons/md";

const Logo: FunctionComponent = () => {
  return (
    <div className="w-12 aspect-square rounded-xl flex-shrink-0 bg-gray-800 text-emerald-400 text-2xl flex items-center justify-center">
      <MdCampaign />
    </div>
  );
};

export { Logo };

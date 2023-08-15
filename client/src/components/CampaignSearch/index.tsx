import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { routePaths } from "src/utils";

const CampaignSearch: FunctionComponent = () => {
  const { register, handleSubmit } = useForm<{ search: string }>();
  const navigate = useNavigate();

  const onSubmit = ({ search }: { search: string }) => {
    if (!search) {
      navigate(routePaths.HOME);

      return;
    }
    navigate(`${routePaths.HOME}?search=${search.toLowerCase()}`);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative w-full h-12 sm:max-w-sm">
        <input
          {...register("search")}
          className="w-full h-full rounded-3xl text-white font-light py-2 bg-gray-800 border-[3px] transition border-transparent hover:border-gray-700 active:border-gray-700 outline-none px-4 placeholder-gray-400"
          placeholder="Search for campaigns..."
        />
        <button className="bg-emerald-400 hover:bg-emerald-300 transition text-black text-xl px-4 rounded-3xl absolute right-2 h-8 top-1/2 -translate-y-1/2">
          <BiSearch />
        </button>
      </div>
    </form>
  );
};

export { CampaignSearch };

import { FunctionComponent } from "react";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import { UserIcon } from "..";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { firstAndLast, routePaths } from "src/utils";
import { Link } from "react-router-dom";
import { BiUser, BiUnlink } from "react-icons/bi";
import { goerli } from "wagmi/chains";

const AccountMenu: FunctionComponent = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balanceData } = useBalance({ address, chainId: goerli.id });

  const menuLinks = [
    {
      title: "My Account",
      disabled: true,
      Icon: BiUser,
      href: routePaths.ACCOUNT,
    },
    {
      title: "Disconnect Wallet",
      Icon: BiUnlink,
      onClick: () => disconnect(),
    },
  ];

  return (
    <HeadlessMenu as="div" className="relative z-10">
      <HeadlessMenu.Button>
        <UserIcon />
      </HeadlessMenu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <HeadlessMenu.Items
          as="div"
          className="bg-gray-700 absolute -bottom-3 rounded-md min-w-[15rem] right-0 translate-y-full shadow-xl"
        >
          <div className="w-full py-3 border-b border-gray-400 px-4">
            <span className="text-lg font-light text-gray-300">
              {address && firstAndLast(address)}
            </span>
          </div>
          <div className="p-4">
            <span className="text-gray-400 font-light mb-2 text-base">
              Wallet Balance
            </span>
            <h2 className="font-semibold text-lg">
              {Number(balanceData?.formatted).toFixed(3)}&nbsp;
              {balanceData?.symbol}
            </h2>
          </div>
          <div className="bg-slate-800 p-4 flex flex-col gap-4">
            {menuLinks.map(({ Icon, ...link }) => {
              const isButton = !link?.href;

              return (
                <HeadlessMenu.Item
                  key={link.title}
                  as={isButton ? "button" : Link}
                  {...(isButton
                    ? { onClick: link.onClick }
                    : { to: link.href })}
                  className="flex items-center gap-2 font-medium hover:text-gray-300 transition"
                >
                  <Icon className="text-2xl" />
                  {link.title}
                </HeadlessMenu.Item>
              );
            })}
          </div>
        </HeadlessMenu.Items>
      </Transition>
    </HeadlessMenu>
  );
};

export { AccountMenu };

import { Menu, Transition } from "@headlessui/react";
import { FunctionComponent } from "react";
import { BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import { navigationLinks } from "src/utils";

const MobileMenu: FunctionComponent = () => {
  return (
    <Menu as="div" className="relative z-10">
      <Menu.Button className="text-gray-400 text-3xl">
        <BiMenu />
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute shadow-lg rounded-md -bottom-4 min-w-[15rem] flex flex-col translate-y-full p-6 gap-2 bg-gray-800">
          {navigationLinks.map(({ Icon, ...item }) => (
            <Menu.Item
              as={Link}
              to={item.href}
              className="text-gray-400 hover:text-white transition text-lg"
            >
              {item.title}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export { MobileMenu };

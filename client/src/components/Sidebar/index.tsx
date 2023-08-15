import { FunctionComponent } from "react";
import { Link, useLocation } from "react-router-dom";
import { navigationLinks } from "src/utils";
import { Logo } from "../Logo";

const Sidebar: FunctionComponent = () => {
  const { pathname } = useLocation();

  return (
    <aside className="fixed top-0 left-0 w-32 px-6 pb-6 hidden sm:flex flex-col h-screen">
      <div className="h-24 flex justify-center items-center">
        <Logo />
      </div>
      <div className="bg-gray-800 flex-1 p-4 rounded-xl">
        {navigationLinks.map(({ Icon, ...link }) => {
          const isActive = pathname === link.href;
          const className = `w-full relative hover:bg-gray-700 transition aspect-square flex items-center justify-center rounded-xl 
          text-2xl mb-4 ${
            isActive
              ? "bg-gray-700 text-emerald-400"
              : "bg-transparent text-gray-400"
          } after:absolute after:translate-x-full after:-right-2 after:shadow-lg after:rounded-md after:opacity-0 
          hover:after:opacity-100 after:invisible hover:after:visible after:transition after:content-[attr(title)] after:text-white after:bg-gray-600 after:p-2 after:text-sm after:whitespace-nowrap`;

          if (link.href.includes("https")) {
            return (
              <a
                key={link.title}
                href={link.href}
                title={link.title}
                className={className}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon />
              </a>
            );
          }

          return (
            <Link
              key={link.title}
              title={link.title}
              className={className}
              to={link.href}
            >
              <Icon />
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export { Sidebar };

import { FunctionComponent, ReactNode, Suspense } from "react";
import { Header } from "../Header";
import { PageLoader } from "../PageLoader";
import { Sidebar } from "../Sidebar";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar />
      <div className="sm:pl-32 pl-6 pr-6 min-h-screen flex flex-col">
        <Header />
        <Suspense fallback={<PageLoader />}>
          <main className="max-w-6xl flex-1 w-full mx-auto pb-6">
            {children}
          </main>
        </Suspense>
      </div>
    </div>
  );
};

export { Layout };

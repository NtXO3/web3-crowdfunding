import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { routePaths } from "./utils/routes";
import { Layout } from "./components/Layout";
import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "src/utils/web3";

const Home = lazy(() => import("./pages/Home"));
const CampaignInfo = lazy(() => import("./pages/CampaignInfo"));
const CreateCampaign = lazy(() => import("./pages/CreateCampaign"));
const Account = lazy(() => import("./pages/Account"));

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Routes>
        <Route
          path={routePaths.HOME}
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path={routePaths.CAMPAIGN}
          element={
            <Layout>
              <CampaignInfo />
            </Layout>
          }
        />
        <Route
          path={routePaths.CREATE_CAMPAIGN}
          element={
            <Layout>
              <CreateCampaign />
            </Layout>
          }
        />
        <Route
          path={routePaths.ACCOUNT}
          element={
            <Layout>
              <Account />
            </Layout>
          }
        />
      </Routes>
    </WagmiConfig>
  );
}

export default App;

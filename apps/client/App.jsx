import { BrowserRouter, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";

function AppContent() {
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
  const { t } = useTranslation();
  const location = useLocation();

  const isPlansPage = location.pathname === "/plans";

  return (
    <>
      {!isPlansPage && (
        <NavigationMenu
          navigationLinks={[
            {
              label: t("NavigationMenu.pageName"),
              destination: "/pagename",
            },
            {
              label: t("NavigationMenu.products"),
              destination: "/products",
            },
          ]}
        />
      )}
      <Routes pages={pages} />
    </>
  );
}

export default function App() {
  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <AppContent />
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}

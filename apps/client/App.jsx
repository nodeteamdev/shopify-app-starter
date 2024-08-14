import { BrowserRouter, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";
import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";
import { useDispatch } from 'react-redux';
import { setShop } from './store/shopSlice';

function AppContent() {
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();

  const isPlansPage = location.pathname === "/plans";

  const shopFromUrl = new URLSearchParams(location.search).get('shop');

  if (shopFromUrl) {
    dispatch(setShop(shopFromUrl));
  }

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
            {
              label: t("NavigationMenu.orders"),
              destination: "/orders",
            },
            {
              label: t("NavigationMenu.recommendations"),
              destination: "/recommendations",
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

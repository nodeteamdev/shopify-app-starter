import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { InlineStack, Spinner } from "@shopify/polaris";
import { useEffect } from "react";

const ExitFrame = () => {
  const app = useAppBridge();
  useEffect(() => {
    const shop = new URLSearchParams(location.search).get("shop");
    const host = new URLSearchParams(location.search).get("host");
    const redirect = Redirect.create(app);

    redirect.dispatch(
      Redirect.Action.REMOTE,
      `${process.env.SHOPIFY_APP_URL}/api/v1/shopify-auth?shop=${shop}&host=${host}`
    );
  }, []);

  return (
    <InlineStack blockAlign="center" align="center">
      <Spinner />
    </InlineStack>
  );
};

export default ExitFrame;

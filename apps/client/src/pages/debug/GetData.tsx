import {
  Layout,
  Card,
  Button,
  Text,
  InlineStack,
  BlockStack,
  // InlineStack,
  Page,
} from "@shopify/polaris";
import { navigate } from "raviger";
import { useEffect, useState } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";

import useFetch from '@/hooks/useFetch.ts';
import { useStore } from '@/stores';


const GetData = () => {
  const [responseData, setResponseData] = useState("");
  const [responseDataPost, setResponseDataPost] = useState("");
  const [responseDataGQL, setResponseDataGQL] = useState("");
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const fetch = useFetch();

  const shop = useStore((state) => state.shop);
  const host = useStore((state) => state.host);

  function redirectToExitframe(res: Response | null) {
    if (res?.status === 400) {
      const authUrlHeader = res.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );
      redirect.dispatch(
        Redirect.Action.APP,
        authUrlHeader || `/exitframe?shop=${shop}&host=${host}`
      );
    }
  }

  async function fetchContent() {
    setResponseData("loading...");

    const res = await fetch("/api/v1/app",
      );
    const { text } = await res?.json();
    redirectToExitframe(res);
    setResponseData(text);
  }
  async function fetchContentPost() {
    setResponseDataPost("loading...");
    const postBody = JSON.stringify({ content: "Body of POST request" });
    const res = await fetch("/api/v1/app", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: postBody,
    });
    const { content } = await res?.json();
    redirectToExitframe(res);
    setResponseDataPost(content);
  }

  async function fetchContentGQL() {
    setResponseDataGQL("loading...");
    const res = await fetch("/api/v1/app",);
    console.log(res);
    const response = await res?.json();
    redirectToExitframe(res);
    setResponseDataGQL(response.body.data.shop.name);
  }

  useEffect(() => {
    fetchContent();
    fetchContentPost();
    fetchContentGQL();
  }, []);

  return (
    <Page
      title="Data Fetching"
      backAction={{ content: "Home", onAction: () => navigate("/debug") }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap='500'>
              <p>
                GET <code>"/apps/api"</code>: {responseData}
              </p>
              <InlineStack align="end">
                <Button
                  onClick={() => {
                    fetchContent();
                  }}
                  // primary
                >
                  Refetch
                </Button>
              </InlineStack>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <BlockStack gap='500'>
              <p>
                POST <code>"/api/v1/app" </code>: {responseDataPost}
              </p>
              <InlineStack align="end">
                <Button
                  onClick={() => {
                    fetchContentPost();
                  }}
                  // primary
                >
                  Refetch
                </Button>
              </InlineStack>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <BlockStack gap='500'>
              <p>
                GET <code>"/api/v1/app"</code>: {responseDataGQL}
              </p>
              <InlineStack align="end">
                <Button
                  onClick={() => {
                    fetchContentGQL();
                  }}
                  // primary
                >
                  Refetch
                </Button>
              </InlineStack>
            </BlockStack>
          </Card>

          <Card>
            <Text variant="headingSm" as="h6">
              Developer Notes
            </Text>
            <li>
              Create a new module in <code>server</code> and add it to your{" "}
              <code>AppModule</code> to expose it behind{" "}
              <code>VerifyRequest</code>.
            </li>
            <li>
              Create a new instance of <code>useFetch()</code> and use that to
              make a request to <code>/your-route/goes-here/</code>
            </li>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default GetData;

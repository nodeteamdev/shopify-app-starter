import { ChannelEvents } from "./../providers/ChannelEventsProvider";
import channel from "./channel";
import { getSessionToken } from "@shopify/app-bridge/utilities";
import { createApp } from "@shopify/app-bridge";

const app = createApp({
  apiKey: '71cbb3bc06d47f5599c7f372418e953f',
  host: 'app-starter-node.myshopify.com',
  forceRedirect: true,
});


export const idToken = (): Promise<string> =>
    Promise.race([
        getSessionToken(app),
        channel.request<string>(
            ChannelEvents.ID_TOKEN_REQUEST,
            ChannelEvents.ID_TOKEN_RESPONSE,
        ),
    ]);

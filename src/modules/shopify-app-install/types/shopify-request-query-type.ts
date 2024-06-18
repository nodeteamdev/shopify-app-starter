export type ShopifyRequestQuery = {
  [key: string]:
    | undefined
    | string
    | string[]
    | ShopifyRequestQuery
    | ShopifyRequestQuery[];
};

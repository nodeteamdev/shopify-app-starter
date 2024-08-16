export interface CreatedShopifyMetafield {
  readonly metafields: {
    readonly key: string,
    readonly namespace: string,
    readonly value: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  }[]
}

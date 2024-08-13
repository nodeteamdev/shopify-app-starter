export interface GetProductNode {
  readonly id: string;
  readonly title: string;
  readonly createdAt: string;
  readonly featuredImage: {
    readonly url: string;
    readonly altText: string;
  };
}

export interface GetProducts {
  readonly body: {
    readonly data: {
      readonly products: {
        readonly edges: [
          {
            readonly node: GetProductNode;
          },
        ];
      };
    };
  };
}

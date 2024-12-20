interface FrequentlyBoughtProducts {
  readonly productId: string;
  readonly count: number;
}

export interface FindFrequentlyBoughtProductsWithMainProduct {
  readonly mainProductId: string;
  readonly products: FrequentlyBoughtProducts[];
}

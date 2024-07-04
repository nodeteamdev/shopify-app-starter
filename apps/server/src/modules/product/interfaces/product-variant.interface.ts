export interface ProductVariant {
  readonly id: string;
  readonly title: string;
  readonly price: string;
  readonly displayName: string;
  readonly image: {
    readonly altText: string | null;
    readonly url: string;
  } | null;
  readonly type: string | null;
}

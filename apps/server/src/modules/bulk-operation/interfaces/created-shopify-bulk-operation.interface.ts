interface BulkOperationUserErrors {
  readonly field: string[];
  readonly message: string;
}

export interface CreatedShopifyBulkOperation {
  readonly bulkOperationRunQuery: {
    readonly bulkOperation: {
      readonly id: string;
      readonly status: string;
    };
    readonly userErrors: BulkOperationUserErrors[];
  };
}

export interface CreatedBulkOperation {
  readonly id: string;
  readonly status: string;
}

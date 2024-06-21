export enum DefaultActions {
  read = 'read',
  aggregate = 'aggregate',
  create = 'create',
  update = 'update',
  delete = 'delete',
  manage = 'manage',
}

export type Actions = DefaultActions;
// eslint-disable-next-line no-redeclare
export const Actions = DefaultActions;

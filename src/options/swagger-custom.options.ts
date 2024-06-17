function sort(a: any, b: any) {
  const order = {
    post: 0,
    get: 1,
    patch: 2,
    put: 3,
    delete: 4,
  };

  type OrderType = typeof order;

  const aOrder = order[a.get('method') as keyof OrderType];
  const bOrder = order[b.get('method') as keyof OrderType];

  if (aOrder !== bOrder) return aOrder - bOrder;

  const aPath = a.get('path');
  const bPath = b.get('path');
  const aBlocks = aPath.split('/').length;
  const bBlocks = bPath.split('/').length;

  if (aBlocks !== bBlocks) return aBlocks > bBlocks ? 1 : -1;

  return aPath > bPath ? 1 : -1;
}

const SwaggerCustomOptions = {
  swaggerOptions: {
    operationsSorter: sort,
    tagsSorter: 'alpha',
    persistAuthorization: true,
    displayRequestDuration: true,
  },
};

export default SwaggerCustomOptions;

export const getOrderByRegex = (unionTypeString: string) =>
  new RegExp(`^(${unionTypeString}):(asc|desc)$`);

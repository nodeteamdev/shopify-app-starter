function chunkArray<T = any>(arr: T[], size: number): T[][] {
  const copyArr: T[] = [...arr];
  const chunks: T[][] = [];

  while (copyArr.length) {
    chunks.push(copyArr.splice(0, size));
  }

  return chunks;
}

export { chunkArray };

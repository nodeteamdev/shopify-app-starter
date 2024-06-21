export function getRandomTimeInMilliseconds(
  fromSeconds: number,
  toSeconds: number,
): number {
  const randomSeconds = Math.random() * (toSeconds - fromSeconds) + fromSeconds;

  return Math.round(randomSeconds * 1000);
}

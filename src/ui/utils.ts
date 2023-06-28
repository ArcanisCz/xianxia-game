export function formatResourceValue(value: number) {
  if (value < 10) {
    return Number(value).toFixed(2);
  }

  if (value > 1000000) {
    return Number(value).toPrecision(2);
  }

  return Math.round(value);
}

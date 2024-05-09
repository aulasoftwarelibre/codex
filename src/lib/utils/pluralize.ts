export function pluralize(
  amount: number,
  singular: string,
  plural: string,
): string {
  return `${amount} ${amount === 1 ? singular : plural}`
}

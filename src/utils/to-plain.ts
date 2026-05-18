/** Converts Mongoose documents to plain objects (safe for Client Components). */
export function toPlainArray<T>(data: unknown): T[] {
  return JSON.parse(JSON.stringify(data))
}

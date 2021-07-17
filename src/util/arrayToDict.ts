/**
 * Transforms the source array of objects into Map indexed with one of object's keys
 * and containing the objects
 *
 * @param source source array of objects
 * @param key object's key used for Map's index
 */
export function arrayToDict<V, K extends keyof V>(
  source: V[],
  key: K,
): Map<V[K], V> {
  const dict = new Map<V[K], V>();
  source.forEach((el) => dict.set(el[key], el));

  return dict;
}

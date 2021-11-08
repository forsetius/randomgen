export class DefaultedMap<K, V> extends Map<K, V> {
  public constructor(
        private readonly defaultKey: K,
        entries: readonly (readonly [K, V])[],
  ) {
    super(entries);

    if (!this.has(defaultKey)) {
      throw new Error('Default element not set');
    }
  }

  public get(key: K): V {
    if (this.has(key)) {
      return super.get(key) as V;
    }

    return super.get(this.defaultKey) as V;
  }
}

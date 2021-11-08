export class RollableWeightedCollection<T> {
  public readonly max: number;
  private readonly store: [T, number][];

  public constructor(
    store: [T, number][],
  ) {
    let i = -1;
    this.store = store.map(([el, weight]) => {
      i += weight;

      return [el, i];
    });

    this.max = i;
  }

  public get(targetNumber?: number): T {
    const rolled = targetNumber ?? Math.floor(Math.random() * this.max);

    const [el] = this.store.find(([, weight]) => rolled < weight)!;

    return el;
  }
}

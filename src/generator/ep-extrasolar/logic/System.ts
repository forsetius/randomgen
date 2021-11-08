import { Star } from './Star';

export class System {
  public readonly orbitals: Orbital[];

  constructor(
    public readonly age: number,
    public readonly primary: Star,
    public readonly orbitals: Orbital[],
  ) {

  }

  public toString(): string {

  }
}

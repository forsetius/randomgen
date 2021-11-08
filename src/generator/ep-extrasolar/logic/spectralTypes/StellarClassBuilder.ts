import { StellarClassInterface } from '../StellarClassInterface';
import { roll } from '../../../../util/random';

export abstract class StellarClassBuilder {
  protected CHANCE_OF_FRACTIONAL_SUBTYPE = 2;

  public abstract rollAge(): number;

  public rollSpectralSubtype(): number | null {
    return roll(1, 100) > this.CHANCE_OF_FRACTIONAL_SUBTYPE
      ? roll(1, 10) - 1
      : (roll(1, 100) - 1) / 10;
  }

  public abstract ageStar(by: number, companionCount: number): StellarClassInterface;
}

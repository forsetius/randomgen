import { flipCoin, roll } from 'src/util/random';
import { SpectralTypeEnum } from './SpectralTypeEnum';
import { StellarClassBuilder } from './StellarClassBuilder';
import { LuminosityClassEnum } from './LuminosityClassEnum';

export class GType implements StellarClassBuilder {
  public getType(): SpectralTypeEnum {
    return SpectralTypeEnum.A;
  }

  public rollAge(): number {
    return Math.floor(roll(1, 10) / 2);
  }

  public ageStar(by: number): StellarClass {
    const age = by + roll(1, 10) / 10;

    if (age <= 2) {
      return {
        type: SpectralTypeEnum.A,
        luminosityClass: LuminosityClassEnum.V,
      };
    }

    if (by <= 3.5) {
      return flipCoin()
        ? {
          type: SpectralTypeEnum.F,
          luminosityClass: LuminosityClassEnum.IV,
        }
        : {
          type: SpectralTypeEnum.K,
          luminosityClass: LuminosityClassEnum.III,
        };
    }

    return {
      type: SpectralTypeEnum.D,
      luminosityClass: null,
    };
  }
}

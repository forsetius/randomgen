import { flipCoin, roll } from 'src/util/random';
import { SpectralTypeEnum } from './SpectralTypeEnum';
import { StellarClassBuilder } from './StellarClassBuilder';
import { LuminosityClassEnum } from './LuminosityClassEnum';
import { StellarClassInterface } from '../StellarClassInterface';

export class CType implements StellarClassBuilder {
  public getType(): SpectralTypeEnum {
    return SpectralTypeEnum.C;
  }

  public rollAge(): number {
    return Math.floor(roll(1, 10) / 2);
  }

  public ageStar(by: number): StellarClassInterface {
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

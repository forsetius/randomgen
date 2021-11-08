import { flipCoin, roll } from 'src/util/random';
import { SpectralTypeEnum } from './SpectralTypeEnum';
import { StellarClassBuilder } from './StellarClassBuilder';
import { LuminosityClassEnum } from './LuminosityClassEnum';
import { StellarClassInterface } from '../StellarClassInterface';

export class AType extends StellarClassBuilder {
  public getType(): SpectralTypeEnum {
    return SpectralTypeEnum.A;
  }

  public rollAge(): number {
    return Math.floor(roll(1, 10) / 2);
  }

  public ageStar(by: number): StellarClassInterface {
    const age = by + roll(1, 10) / 10;

    if (age <= 2) {
      return {
        spectralType: SpectralTypeEnum.A,
        spectralSubtype: this.rollSpectralSubtype(),
        luminosityClass: LuminosityClassEnum.V,
      };
    }

    if (by <= 3.5) {
      return flipCoin()
        ? {
          spectralType: SpectralTypeEnum.F,
          luminosityClass: LuminosityClassEnum.IV,
        }
        : {
          spectralType: SpectralTypeEnum.K,
          luminosityClass: LuminosityClassEnum.III,
        };
    }

    return {
      spectralType: SpectralTypeEnum.D,
      luminosityClass: LuminosityClassEnum.VII,
    };
  }
}

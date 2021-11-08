import { flipCoin, roll } from 'src/util/random';
import { LuminosityClassEnum } from './LuminosityClassEnum';
import { SpectralTypeEnum } from './SpectralTypeEnum';
import { StellarClassInterface } from '../StellarClassInterface';
import { StellarClassBuilder } from './StellarClassBuilder';

export class OType implements StellarClassBuilder {
  public getType(): SpectralTypeEnum {
    return SpectralTypeEnum.O;
  }

  public rollAge(): number {
    return Math.round(roll(1, 10) / 2);
  }

  public ageStar(by: number): StellarClassInterface {
    switch (by) {
      case 1:
        return flipCoin()
          ? {
            spectralType: SpectralTypeEnum.O,
            luminosityClass: LuminosityClassEnum.Ia,
          }
          : {
            spectralType: SpectralTypeEnum.O,
            luminosityClass: LuminosityClassEnum.Ib,
          };
      case 2:
        return {
          spectralType: SpectralTypeEnum.B,
          luminosityClass: LuminosityClassEnum.Ib,
        };
      default:
        return {
          spectralType: SpectralTypeEnum.M,
          luminosityClass: LuminosityClassEnum.Ib,
        };
    }
  }
}

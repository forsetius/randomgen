import { StellarClassBuilder } from './StellarClassBuilder';
import { OType } from './OType';
import { SpectralTypeEnum } from './SpectralTypeEnum';

export class BType extends OType implements StellarClassBuilder {
  public getType(): SpectralTypeEnum {
    return SpectralTypeEnum.B;
  }
}

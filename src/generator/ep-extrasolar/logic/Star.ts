import { RegionEnum } from './RegionEnum';
import { StellarClassInterface } from './StellarClassInterface';

export class Star {
  public constructor(
    public region: RegionEnum,
    public spectralClass: StellarClassInterface,
  ) {
  }
}

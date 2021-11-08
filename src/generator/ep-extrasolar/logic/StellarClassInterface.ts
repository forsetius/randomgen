import { LuminosityClassEnum } from './spectralTypes/LuminosityClassEnum';
import { SpectralTypeEnum } from './spectralTypes/SpectralTypeEnum';
import { WhiteDwarfSpectralFeatureEnum } from './spectralTypes/WhiteDwarfSpectralFeatureEnum';

export interface StellarClassInterface {
  spectralType: SpectralTypeEnum;
  spectralSubtype: number | WhiteDwarfSpectralFeatureEnum[];
  luminosityClass: LuminosityClassEnum;
  features: string[];
}

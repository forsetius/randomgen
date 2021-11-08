/* eslint-disable no-plusplus */
import { roll } from 'src/util/random';
import { RollableWeightedCollection } from 'src/util/RollableWeightedCollection';
import { BaseGenerator } from '../../BaseGenerator';
import { companionDistanceProbs, numberOfStarProbs, spectralTypeProbs } from '../dicts';
import * as SpectralTypeBuilders from '../logic/spectralTypes';
import { RegionEnum } from '../logic/RegionEnum';
import { SpectralTypeEnum } from '../logic/spectralTypes/SpectralTypeEnum';
import { System } from '../logic/System';
import { Star } from '../logic/Star';
import { StellarClassInterface } from '../logic/StellarClassInterface';

export class BaseEpExtrasolarGenerator extends BaseGenerator {
  private numberOfStarProbs: RollableWeightedCollection<number>;
  private spectralTypeProbs: RollableWeightedCollection<SpectralTypeEnum>;
  private companionDistanceProbs: RollableWeightedCollection<RegionEnum>;
  private spectralTypeBuilders = {
    [SpectralTypeEnum.O]: new SpectralTypeBuilders.OType(),
    [SpectralTypeEnum.B]: new SpectralTypeBuilders.BType(),
    [SpectralTypeEnum.A]: new SpectralTypeBuilders.AType(),
    [SpectralTypeEnum.F]: new SpectralTypeBuilders.FType(),
    [SpectralTypeEnum.G]: new SpectralTypeBuilders.GType(),
    [SpectralTypeEnum.K]: new SpectralTypeBuilders.KType(),
    [SpectralTypeEnum.M]: new SpectralTypeBuilders.MType(),
    [SpectralTypeEnum.L]: new SpectralTypeBuilders.LType(),
    [SpectralTypeEnum.T]: new SpectralTypeBuilders.TType(),
    [SpectralTypeEnum.Y]: new SpectralTypeBuilders.YType(),
    [SpectralTypeEnum.C]: new SpectralTypeBuilders.CType(),
    [SpectralTypeEnum.S]: new SpectralTypeBuilders.SType(),
    [SpectralTypeEnum.D]: new SpectralTypeBuilders.DType(),
    [SpectralTypeEnum.X]: new SpectralTypeBuilders.XType(),
    [SpectralTypeEnum.Exotic]: new SpectralTypeBuilders.ExoticType(),
  };

  public constructor() {
    super();

    this.numberOfStarProbs = new RollableWeightedCollection(numberOfStarProbs);
    this.spectralTypeProbs = new RollableWeightedCollection(spectralTypeProbs);
    this.companionDistanceProbs = new RollableWeightedCollection(companionDistanceProbs);
  }

  public generate(params: any): string {
    const stars = this.rollStars();
    const primary = stars[0]!;

    const age = this.spectralTypeBuilders[primary.spectralClass.spectralType].rollAge();
    stars.forEach((star) => {
      star.spectralClass = this.spectralTypeBuilders[primary.spectralClass.spectralType]
        .ageStar(age, stars.length - 1);
    });

    return new System(age, primary, orbitals).toString();
  }

  private rollStars(): Star[] {
    const numberOfStars = this.numberOfStarProbs.get();
    const spectralTypeRoll = roll(1, this.spectralTypeProbs.max);

    const stars = new Array(numberOfStars) as Star[];
    stars[0] = new Star(RegionEnum.CORE, this.rollStellarClass(spectralTypeRoll));
    for (let i = 1; i < numberOfStars; i++) {
      const star = new Star(
        this.companionDistanceProbs.get(),
        this.rollStellarClass(spectralTypeRoll + roll(2, 10)),
      );

      stars.push(star);
    }

    return stars;
  }

  private rollStellarClass(spectralTypeRoll: number): StellarClassInterface {
    const spectralType = this.spectralTypeProbs.get(spectralTypeRoll);
    const builder = this.spectralTypeBuilders[spectralType];
    builder.return;
  }
}

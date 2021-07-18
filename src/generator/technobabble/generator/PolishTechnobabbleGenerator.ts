import { flipCoin } from '../../../util/random';
import { RollableCollection } from '../../../util/RollableCollection';
import { BaseGenerator } from '../../BaseGenerator';

export class PolishTechnobabbleGenerator extends BaseGenerator {
  private action: RollableCollection<string>;
  private descriptor: RollableCollection<AdjectiveForms>;
  private source: RollableCollection<AdjectiveForms>;
  private effect: RollableCollection<NounForms>;
  private device: RollableCollection<NounForms>;

  public constructor() {
    super();

    const dicts = this.getSourceData('technobabble-pl');
    this.action = new RollableCollection<string>(dicts['action']);
    this.descriptor = new RollableCollection<AdjectiveForms>(dicts['descriptor']);
    this.source = new RollableCollection<AdjectiveForms>(dicts['source']);
    this.effect = new RollableCollection<NounForms>(dicts['effect']);
    this.device = new RollableCollection<NounForms>(dicts['device']);
  }

  public generate(params: any): string {
    const action = this.action.get();
    const descriptor = this.descriptor.get();
    const source = this.source.get();
    const effect = this.effect.get();
    const device = this.device.get();

    const isEffectPlural = flipCoin();
    const isDevicePlural = flipCoin();
    
    return [
      action,
      this.pickAdjectiveForm(descriptor, device.gender, isDevicePlural),
      this.pickNounForm(device, isDevicePlural),
      this.pickNounForm(effect, isEffectPlural),
      this.pickAdjectiveForm(source, effect.gender, isEffectPlural),
    ].join(' ');
  }

  private pickAdjectiveForm(forms: AdjectiveForms, gender: Gender, isPlural: boolean) {
    return isPlural ? forms.pl : forms[gender];
  }

  private pickNounForm(forms: NounForms, isPlural: boolean) {
    return isPlural ? forms.pl : forms.sing;
  }
}

type Gender = 'm' | 'f' | 'n' | 'pl';
type AdjectiveForms = Record<Gender, string>;
type NounForms = { gender: Gender, sing: string, pl: string };

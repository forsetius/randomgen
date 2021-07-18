import { RollableCollection } from '../../../util/RollableCollection';
import { BaseGenerator } from '../../BaseGenerator';

export class EnglishTechnobabbleGenerator extends BaseGenerator {
  private action: RollableCollection<string>;
  private descriptor: RollableCollection<string>;
  private source: RollableCollection<string>;
  private effect: RollableCollection<string>;
  private device: RollableCollection<string>;

  public constructor() {
    super();

    const dicts = this.getSourceData('technobabble-en');
    this.action = new RollableCollection<string>(dicts['action']);
    this.descriptor = new RollableCollection<string>(dicts['descriptor']);
    this.source = new RollableCollection<string>(dicts['source']);
    this.effect = new RollableCollection<string>(dicts['effect']);
    this.device = new RollableCollection<string>(dicts['device']);
  }

  public generate(params: any): string {
    return [
      this.action.get(),
      this.descriptor.get(),
      this.source.get(),
      this.effect.get(),
      this.device.get(),
    ].join(' ');
  }
}

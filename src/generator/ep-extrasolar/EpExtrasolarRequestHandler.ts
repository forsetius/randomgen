import { singleton } from 'tsyringe';
import { DefaultedMap } from '../../util/DefaultedMap';
import { BaseGenerator } from '../BaseGenerator';
import { AbstractRequestHandler } from '../RequestHandler';
import { EnglishEpExtrasolarGenerator } from './generators/EnglishEpExtrasolarGenerator';

@singleton()
export class RequestHandler extends AbstractRequestHandler {
  protected generators: DefaultedMap<string, BaseGenerator>;

  public constructor() {
    super();

    this.generators = new DefaultedMap<string, BaseGenerator>(
      'pl',
      [
        // ['pl', new PolishEpExtrasolarGenerator()],
        ['en', new EnglishEpExtrasolarGenerator()],
      ],
    );
  }
}

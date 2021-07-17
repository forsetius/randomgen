import { DefaultedMap } from "src/util/DefaultedMap";
import { singleton } from "tsyringe";
import { BaseGenerator } from "../BaseGenerator";
import { AbstractRequestHandler } from "../RequestHandler"
import { EnglishTechnobabbleGenerator } from "./generetor/EnglishTechnobabbleGenerator";
import { PolishTechnobabbleGenerator } from "./generetor/PolishTechnobabbleGenerator";

@singleton()
export class TechnobabbleRequestHandler extends AbstractRequestHandler {
    protected generators: DefaultedMap<string, BaseGenerator>;

    public constructor() {
        super();

        this.generators = new DefaultedMap<string, BaseGenerator>(
            'pl',
            [
                ['pl', new PolishTechnobabbleGenerator()],
                ['en', new EnglishTechnobabbleGenerator()]
            ]
        );
    }
}

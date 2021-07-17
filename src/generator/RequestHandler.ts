import { transformAndValidate } from "class-transformer-validator";
import { Request, Response } from "express";
import { DefaultedMap } from "src/util/DefaultedMap";
import { BaseGenerator } from "./BaseGenerator";
import { RequestModel } from "./technobabble/RequestModel";

export abstract class AbstractRequestHandler {
    protected abstract generators: DefaultedMap<string, BaseGenerator>;

    public async handle(req: Request, res: Response): Promise<void> {
        const params = await this.getParams(req);
        const generator = this.selectGenerator(params);
        
        res.send(generator.generate(params));
    }

    protected async getParams(req: Request): Promise<RequestModel> {
        const model = await this.getModel(req);
        if (!model.lang) {
            model.lang = (req.acceptsLanguages() || null).shift()?.slice(0, 2);
        }

        return model as RequestModel;
    }

    protected getModel(req: Request): Promise<RequestModel> {
        try {
            return transformAndValidate(RequestModel, req.query);
        } catch (err: unknown) {
            throw new Error('Invalid arguments');
        }
    }

    protected selectGenerator(model: RequestModel): BaseGenerator {
        return this.generators.get(model.lang ?? '');
    }
}

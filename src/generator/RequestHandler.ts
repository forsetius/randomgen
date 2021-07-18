import { transformAndValidate } from "class-transformer-validator";
import { ValidationError } from "class-validator";
import { Request, Response } from "express";
import { DefaultedMap } from "../util/DefaultedMap";
import { BaseGenerator } from "./BaseGenerator";
import { RequestModel } from "./technobabble/RequestModel";

export abstract class AbstractRequestHandler {
    protected abstract generators: DefaultedMap<string, BaseGenerator>;

    public async handle(req: Request, res: Response): Promise<void> {
        let msg: string;
        let status: number;
        
        try {
            const params = await this.getParams(req);
            const generator = this.selectGenerator(params);
        
            msg = generator.generate(params);
            status = 200;
        } catch (err: unknown) {
            if (Array.isArray(err) && err[0] instanceof ValidationError) {
                status = 400;
                
                msg = 'Invalid request:\n - ';
                err.forEach(fail => {
                    msg += Object.values(fail.constraints ?? {}).join('\n - ');
                });
            } else {
                status = 500;
                msg = 'Internal error';
            }
        }

        res.status(status).send(msg);
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
            return transformAndValidate(RequestModel, req.query, { validator: { forbidUnknownValues: true } });
        } catch (err: unknown) {
            throw new Error('Invalid arguments');
        }
    }

    protected selectGenerator(model: RequestModel): BaseGenerator {
        return this.generators.get(model.lang ?? '');
    }
}

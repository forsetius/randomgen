import { IsISO31661Alpha2 } from "class-validator";

export class RequestModel {
    @IsISO31661Alpha2()
    lang?: string;
}

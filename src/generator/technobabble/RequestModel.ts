import { IsLocale, IsOptional } from "class-validator";

export class RequestModel {
    @IsOptional()
    @IsLocale({ message: '"lang": invalid language code' })
    lang?: string;
}

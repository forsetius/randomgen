import { IsInt, IsLocale, IsOptional, Max, Min } from 'class-validator';

export class RequestModel {
  @IsOptional()
  @IsLocale({ message: '"lang": invalid language code' })
  lang?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(3)
  stars?: number;
}

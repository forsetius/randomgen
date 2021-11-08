import fs from 'fs';

export abstract class BaseGenerator {
  public abstract generate(params: any): string;

  protected getSourceData(filename: string): Record<string, any> {
    return JSON.parse(fs.readFileSync(`${__dirname}/../../dict/${filename}.json`, 'utf-8')) as Record<string, any>;
  }
}

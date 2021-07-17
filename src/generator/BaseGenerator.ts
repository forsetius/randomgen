import fs from 'fs';
import { Request, Response } from 'express';
import { DictFiles } from '../type/DictFiles';
import { Sources } from '../type/Sources';

export abstract class BaseGenerator<B> {
  protected abstract getDictFiles(): DictFiles;
  protected readonly dicts: Record<string, any>;

  public constructor() {
    const filesDef = this.getDictFiles();
    const sources: Sources<B> = { default: filesDef.default, dicts: {} };

    Object.entries(filesDef.files).forEach(([filename, lang]) => {
      sources.dicts[lang] = JSON.parse(fs.readFileSync(`../dict/${filename}.json`, 'utf-8'));
    });

  }

  public process(req: Request, res: Response): void {
    const lang = req.query['lang'] ?? (req.acceptsLanguages() || null).shift()?.slice(0, 2) ?? this.dicts;

    res.send(this.generate());
  }

  protected abstract generate():  {

  }
}



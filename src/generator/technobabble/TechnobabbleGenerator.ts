import { Request, Response } from 'express';
import { singleton } from 'tsyringe';
import { DictFiles } from '../../type/DictFiles';
import { BaseGenerator } from '../BaseGenerator';

@singleton()
export class TechnobabbleGenerator extends BaseGenerator<DictDef> {
  protected getDictFiles = (): DictFiles => ({
    default: 'pl',
    files: {
      pl: 'technobabble-pl',
    }
  });

  
}

interface DictDef {
  action: string[];
  descriptor: Record<Gender, string>[];
  source: Record<Gender, string>[];
  effect: { gender: Gender, sing: string, pl: string}[];
  device: { gender: Gender, sing: string, pl: string }[];
}

type Gender = 'm' | 'f' | 'n' | 'mpl' | 'npl';

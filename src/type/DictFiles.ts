import { FileName, Lang } from './aliases';

export interface DictFiles {
  default: Lang;
  files: Record<Lang, FileName>;
}

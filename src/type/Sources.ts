import { Lang } from './aliases';

export interface Sources<T> {
  default: Lang;
  files: Record<Lang, T>;
}

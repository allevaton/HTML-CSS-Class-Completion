import * as path from 'path';

export function getFile(...paths: string[]): string {
  return path.join(__dirname, '..', '..', 'test', ...paths);
}

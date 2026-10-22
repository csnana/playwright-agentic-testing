import path from 'node:path';
import { pathToFileURL } from 'node:url';

export function getLocalPageUrl(relativePath: string): string {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  return pathToFileURL(absolutePath).href;
}
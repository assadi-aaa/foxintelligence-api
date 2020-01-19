import * as url from 'url';
import { LocalStorageService } from '../services';

export function getPartsOfLogLine(line: string): RegExpMatchArray {
  const reg = new RegExp('^(\\S+) (\\S+) (\\S+) \\[([\\w:/]+\\s[+\\-]\\d{4})\\] "(\\S+)\\s?(\\S+)?\\s?(\\S+)?" (\\d{3}|-) (\\d+|-)\\s?"?([^"]*)"?\\s?"?([^"]*)?"?$');
  return line.match(reg);
}

export function validateStatus(status) {
  return status >= 200 && status < 300; // default
}

export function getSectionFromUrl(urlPath: string): string {
  return url?.parse(urlPath)?.pathname?.split('/')[1];
}

export const clearCache = async () => {
  const storageService = new LocalStorageService();
  await storageService.clearAll();
};

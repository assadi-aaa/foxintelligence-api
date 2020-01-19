import * as fs from 'fs';
import * as stream from 'stream';
import * as readline from 'readline';
import { Interface } from 'readline';

export class FileReaderService {

  filePath: string;

  constructor() {
    this.filePath = 'access.log';
  }

  isFileExist(): boolean {
    return fs.existsSync(this.filePath);
  }

  getFileSize(): number {
    return fs.statSync(this.filePath).size;
  }

  parseFile(startReadFrom: number = 0, cbProgress, cbFinish) {
    const readLineIterator = this.createStreamReadLine(startReadFrom);
    readLineIterator.on('line', (line: string) => cbProgress(line));
    readLineIterator.on('close', () => cbFinish());
  }

  private createStreamReadLine(startReadFrom: number): Interface {
    const instream = fs.createReadStream(this.filePath, { start: startReadFrom });
    const outstream: any = new stream();
    return readline.createInterface(instream, outstream);
  }

}

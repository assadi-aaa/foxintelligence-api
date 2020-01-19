import * as fs from 'fs';
import * as stream from 'stream';
import * as readline from 'readline';
import { Interface } from 'readline';
import { ConfigService } from '../config/config.service';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FileReaderService {

  filePath: string;

  constructor(private configService: ConfigService) {
    this.filePath = this.configService.get('FILE_PATH');
  }

  isFileExist(): boolean {
    return fs.existsSync(this.filePath);
  }

  getFileSize(): number {
    return fs.statSync(this.filePath).size;
  }

  parseFile(startReadFrom: number = 0): Observable<string> {
    const readLineIterator = this.createStreamReadLine(startReadFrom);
    return new Observable(subscriber => {
      readLineIterator.on('line', (line: string) => subscriber.next(line));
      readLineIterator.on('close', () => subscriber.complete());
      readLineIterator.on('error', (err) => subscriber.error(err));
    });
  }

  private createStreamReadLine(startReadFrom: number): Interface {
    const instream = fs.createReadStream(this.filePath, { start: startReadFrom });
    const outstream: any = new stream();
    return readline.createInterface(instream, outstream);
  }

}

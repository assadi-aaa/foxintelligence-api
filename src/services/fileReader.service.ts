import * as fs from 'fs';
import * as stream from 'stream';
import * as readline from 'readline';
import * as es from 'event-stream';
import { Interface } from 'readline';
import { ConfigService } from '../config/config.service';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Stream } from 'stream';

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
    return new Observable(subscriber => {
      const readLineIterator = this.createStreamReadLine(startReadFrom);
      readLineIterator.pipe(es.split())
        .pipe(es.mapSync((line: string) => subscriber.next(line))
          .on('close', () => subscriber.complete())
          .on('error', (err) => subscriber.error(err)),
        );
    });
  }

  private createStreamReadLine(startReadFrom: number): Stream {
    return fs.createReadStream(this.filePath, { start: startReadFrom });
  }

}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { FileReaderService, LocalStorageService } from '../services';
import { Interval, NestSchedule } from 'nest-schedule';
import { getPartsOfLogLine, getSectionFromUrl, validateStatus } from '../helpers';
import { DataProcessingModel, RequestModel, SectionData, Section } from '../models';
import * as moment from 'moment';
import { ConfigService } from '../config/config.service';
import { DataResponseModel } from '../models/data-response.model';

@Injectable()
export class LogService extends NestSchedule implements OnModuleInit {

  lastRequest: RegExpMatchArray;
  newVisitors: Set<string>;
  data: DataProcessingModel;
  env: string;

  constructor(private storageService: LocalStorageService,
              private fileService: FileReaderService, private configService: ConfigService) {
    super();
    this.env = configService.get('NODE_ENV');
  }

  onModuleInit() {
    this.data = {
      sections: {} as SectionData,
      uniqueVisitors: [],
      numberRequests: 0,
      numberValidRequests: 0,
    };
  }

  /*@Interval(10000) //TODO
 intervalJob() {
   this.processFileLog();
 }*/

  async processFileLog() {
    return new Promise((async (resolve, reject) => {
      if (!this.fileService.isFileExist()) {
        return reject(new Error('file log doesn\'t exist'));
      }

      /* get data from last parsing and position from where reading file ended */
      const sectionsData = await this.storageService.getItem('sectionsData') as DataProcessingModel;
      const lastFileSize = await this.storageService.getItem('lastFileSize');
      const fileSize = this.fileService.getFileSize();
      await this.storageService.setItem('lastFileSize', fileSize);

      /* init data */
      this.data = sectionsData || this.data;
      this.newVisitors = new Set(this.data.uniqueVisitors);

      /*start parsing*/
      const startReadFrom = /*(this.env !== 'test' && lastFileSize) ? lastFileSize :*/ 0; // TODO
      this.fileService.parseFile(startReadFrom)
        .subscribe({
          next: (line) => this.onReadLineHandler(line),
          complete: () => this.onFinishHandler(resolve),
        });
    }));

  }

  private onReadLineHandler(line: string) {
    const lineParts = getPartsOfLogLine(line);

    if (lineParts) {
      const sectionName: string = getSectionFromUrl(lineParts[6] || '');
      const isSuccess: boolean = validateStatus(lineParts[8] || false);

      // get unique visitors

      this.newVisitors.add(lineParts[1]);

      // get stats requests
      this.data.numberRequests++;
      this.data.numberValidRequests += (+isSuccess);

      // get stats requests
      if (sectionName) {
        if (!this.data.sections[sectionName]) {
          this.data.sections[sectionName] = {
            occurrence: 1,
            successNumber: +isSuccess,
          };
        } else {
          this.data.sections[sectionName].occurrence++;
          this.data.sections[sectionName].successNumber += (+isSuccess);
        }
      }

      // get last request from file log
      this.lastRequest = lineParts;
    }
  }

  private async onFinishHandler(resolve) {

    // store data to use it next time we read the file
    this.data.uniqueVisitors = [...this.newVisitors.values()];
    await this.storageService.setItem('sectionsData', this.data);

    // prepare response to return as response for client request
    resolve(this.prepareResponse());
  }

  private prepareResponse(): DataResponseModel {
    const { sections, ...dataResponse } = this.data;
    const newSections = Object.keys(sections).map((value: string) => {
      return { ...sections[value], sectionName: value };
    }).sort((sectionA: Section, sectionB: Section) => sectionB.occurrence - sectionA.occurrence);
    const lastRequest = this.createLastRequest();
    return { ...dataResponse, sections: newSections, lastRequest } as DataResponseModel;
  }

  private createLastRequest(): RequestModel {
    const lastRequest = {} as RequestModel;
    lastRequest.date = moment(this.lastRequest[4], 'DD/MMM/YYYY:HH:mm:ss Z').toDate();
    lastRequest.url = this.lastRequest[1];
    lastRequest.method = this.lastRequest[1];
    lastRequest.status = this.lastRequest[5];
    lastRequest.section = getSectionFromUrl(this.lastRequest[6]);
    lastRequest.isSuccess = validateStatus(this.lastRequest[8]);
    return lastRequest;
  }
}

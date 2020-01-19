import { Injectable, OnModuleInit } from '@nestjs/common';
import { FileReaderService, LocalStorageService } from '../services';
import { Interval, NestSchedule } from 'nest-schedule';
import { getPartsOfLogLine, getSectionFromUrl, validateStatus } from '../helpers';
import { Sections, RequestModel, SectionData } from '../models';

@Injectable()
export class LogService extends NestSchedule implements OnModuleInit {

  lastRequest: string;
  newVisitors: Set<string>;
  data: Sections;

  constructor(private storageService: LocalStorageService,
              private fileService: FileReaderService) {
    super();
  }

  onModuleInit() {
    // tslint:disable-next-line:no-console
    console.log(`The module has been initialized.`);

    this.data = {
      sections: {} as SectionData,
      lastVisit: {} as RequestModel,
      uniqueVisitors: [],
      numberRequests: 0,
      numberValidRequests: 0,
    };
  }

  async processFileLog() {

    return new Promise((async (resolve, reject) => {

      if (!this.fileService.isFileExist()) {
        return reject(new Error('file log doesn\'t exist'));
      }

      const sectionsData = await this.storageService.getItem('sectionsData') as Sections;
      const lastFileSize = await this.storageService.getItem('lastFileSize');
      const fileSize = this.fileService.getFileSize();
      await this.storageService.setItem('lastFileSize', fileSize);

      this.data = sectionsData || this.data;

      const startReadFrom = lastFileSize || 0;

      this.newVisitors = new Set(this.data.uniqueVisitors);

      this.fileService.parseFile(startReadFrom,
        (line) => this.onReadLineHandler(line),
        () => this.onFinishHandler(resolve));
    }));

  }

  private onReadLineHandler(line: string) {
    const lineParts = getPartsOfLogLine(line);

    if (lineParts) {

      const sectionName: string = getSectionFromUrl(lineParts[6] || '');
      const isSuccess: boolean = validateStatus(lineParts[8] || false);

      // get unique visitors
      this.newVisitors.add(sectionName);

      // get stats requests
      this.data.numberRequests++;
      this.data.numberValidRequests += +isSuccess;

      // get stats requests
      if (sectionName) {
        if (!this.data.sections[sectionName]) {
          this.data.sections[sectionName] = {
            occurrence: 1,
            successNumber: +isSuccess,
          };
        } else {
          this.data.sections[sectionName].occurrence++;
          this.data.sections[sectionName].successNumber += +isSuccess;
        }
      }

      // get last request from file log
      this.lastRequest = line;
    }
  }

  private async onFinishHandler(resolve) {
    this.data.uniqueVisitors = [...this.newVisitors.values()];
    await this.storageService.setItem('sectionsData', this.data);

    const { sections, ...dataResponse } = this.data;
    resolve(dataResponse);
  }

  /*@Interval(10000)
  intervalJob() {
    this.processFileLog();
  }*/

}

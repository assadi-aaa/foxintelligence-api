import { SectionData } from './section-data.model';
import { RequestModel } from './request.model';

export interface DataProcessingModel {
  sections: SectionData;
  uniqueVisitors: string[];
  numberRequests: number;
  lastRequest: RequestModel;
  numberValidRequests: number;
}

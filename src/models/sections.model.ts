import { RequestModel } from './request.model';
import { SectionData } from './section-data.model';

export interface Sections {
  sections: SectionData;
  lastVisit: RequestModel;
  uniqueVisitors: string[];
  numberRequests: number;
  numberValidRequests: number;
}

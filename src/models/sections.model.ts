import { RequestModel } from './request.model';
import { SectionData } from './section-data.model';

export interface Sections {
  sections: SectionData;
  lastVisit: string;
  uniqueVisitors: string[];
  numberRequests: number;
  numberValidRequests: number;
}

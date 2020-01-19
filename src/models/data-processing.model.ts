import { SectionData } from './section-data.model';

export interface DataProcessingModel {
  sections: SectionData;
  uniqueVisitors: string[];
  numberRequests: number;
  numberValidRequests: number;
}

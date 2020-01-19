import { Section } from './section.model';
import { RequestModel } from './request.model';

export interface DataResponseModel {
  sections: Section[];
  uniqueVisitors: string[];
  numberRequests: number;
  numberValidRequests: number;
  lastRequest: RequestModel;
}

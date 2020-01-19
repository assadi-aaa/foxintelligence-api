import { getPartsOfLogLine, getSectionFromUrl, validateStatus } from './helpers';

describe('getPartsOfLogLine', () => {

  const LogEntry = '127.0.0.1 - Jill [09/May/2018:16:00:41 +0000] "GET /api/user HTTP/1.0" 200 234';
  const logParts = getPartsOfLogLine(LogEntry);

  it('should be defined', () => {
    expect(typeof getPartsOfLogLine).toBe('function');
    expect(logParts).toBeDefined();
  });

  it('should respect the pattern', () => {
    expect(logParts[0]).toEqual(LogEntry);
    expect(logParts[1]).toEqual('127.0.0.1');
    expect(logParts[4]).toEqual('09/May/2018:16:00:41 +0000');
    expect(logParts[6]).toEqual('/api/user');
    expect(logParts[8]).toEqual('200');
  });
});

describe('validateStatus', () => {

  const isSuccess = validateStatus(200);
  const isError = validateStatus(500);

  it('should test the type status code : success or failed ', () => {
    expect(isSuccess).toBeTruthy();
    expect(isError).toBeFalsy();
  });

});

describe('getSectionFromUrl', () => {

  const section1 = getSectionFromUrl('/api/user');
  const section2 = getSectionFromUrl('www.test.com/demo/1');

  it('should return section from ', () => {
    expect(section1).toBeDefined();
    expect(typeof section1).toBe('string');
    expect(section1).toEqual('api');
    expect(section2).toEqual('demo');
  });

});

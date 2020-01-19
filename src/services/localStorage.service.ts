import * as nodePersist from 'node-persist';

export class LocalStorageService {

  constructor() {
    this.initStorage();
  }

  async getItem(key) {
    return nodePersist.getItem(key);
  }

  async setItem(key, data) {
    return nodePersist.setItem(key, data);
  }

  async clearAll() {
    await nodePersist.clear();
  }

  private async initStorage() {
    await nodePersist.init({
      stringify: JSON.stringify,
      parse: JSON.parse,
      encoding: 'utf8',
      ttl: false,
    });
  }

}

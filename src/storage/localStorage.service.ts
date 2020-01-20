import * as nodePersist from 'node-persist';

export class LocalStorageService {

  async getItem(key) {
    return nodePersist.getItem(key);
  }

  async setItem(key, data) {
    return nodePersist.setItem(key, data);
  }

  async clearAll() {
    await nodePersist.clear();
  }

  public async initStorage() {
    return nodePersist.init({
      stringify: JSON.stringify,
      parse: JSON.parse,
      encoding: 'utf8',
      ttl: false,
    });
  }

}

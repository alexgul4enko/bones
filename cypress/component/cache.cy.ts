import specTitle from 'cypress-sonarqube-reporter/specTitle';
import { CacheModule } from 'cache/lib';

describe(specTitle('@cranium/cache'), () => {
  it('should build storage key', () => {
    expect(CacheModule.getStorageKey()).to.equal(null);
    expect(CacheModule.getStorageKey(() => 'test')).to.equal('test');
    expect(CacheModule.getStorageKey('userId')).to.equal('userId');
  });

  it('should cache data to localStorage', () => {
    CacheModule.put({ key: 'localStorage-key' }, { y: 2 });
    expect(JSON.parse(localStorage.getItem('localStorage-key'))).to.deep.equal({ y: 2 });
    expect(CacheModule.get({ key: 'localStorage-key' })).to.deep.equal({ y: 2 });
    CacheModule.put({ key: 'localStorage-key' });
    expect(localStorage.getItem('localStorage-key')).to.equal(null);
    expect(CacheModule.get({ key: 'localStorage-key' })).to.equal(null);
  });

  it('should cache data to sessionStorage', () => {
    CacheModule.put({ key: 'sessionStorage-key', storage: sessionStorage }, { y: 2 });
    expect(JSON.parse(sessionStorage.getItem('sessionStorage-key'))).to.deep.equal({ y: 2 });
    expect(CacheModule.get({ key: 'sessionStorage-key', storage: sessionStorage })).to.deep.equal({ y: 2 });

    CacheModule.put({ key: 'sessionStorage-key', storage: sessionStorage });
    expect(sessionStorage.getItem('sessionStorage-key')).to.equal(null);
    expect(CacheModule.get({ key: 'sessionStorage-key', storage: sessionStorage })).to.equal(null);
  });

  it('should cache data to custom storage', () => {
    class MyStorage {
      private store = {};
      public getItem(key: string) {
        return this.store[key];
      }

      public setItem(key: string, item: any) {
        this.store[key] = item;
      }

      public removeItem(key: string) {
        delete this.store[key];
      }
    }

    const storage = new MyStorage();

    CacheModule.put({ key: 'MyStorage-key', storage }, { y: 2 });
    expect(JSON.parse(storage.getItem('MyStorage-key'))).to.deep.equal({ y: 2 });
    expect(CacheModule.get({ key: 'MyStorage-key', storage })).to.deep.equal({ y: 2 });

    CacheModule.put({ key: 'MyStorage-key', storage });
    expect(storage.getItem('MyStorage-key')).to.equal(undefined);
    expect(CacheModule.get({ key: 'MyStorage-key', storage })).to.equal(null);
  });

  it('should return null if there is no key', () => {
    expect(CacheModule.get({})).to.equal(null);
  });

  it('should cache not only JSON data', () => {
    CacheModule.put({ key: 'number-data' }, 4);
    expect(localStorage.getItem('number-data')).to.equal('4');
    expect(CacheModule.get({ key: 'number-data' })).to.equal(4);

    CacheModule.put({ key: 'float-data' }, 4.321);
    expect(localStorage.getItem('float-data')).to.equal('4.321');
    expect(CacheModule.get({ key: 'float-data' })).to.equal(4.321);

    CacheModule.put({ key: 'string-data' }, 'string');
    expect(localStorage.getItem('string-data')).to.equal('string');
    expect(CacheModule.get({ key: 'string-data' })).to.equal('string');

    CacheModule.put({ key: 'bool-data' }, true);
    expect(localStorage.getItem('bool-data')).to.equal('true');
    expect(CacheModule.get({ key: 'bool-data' })).to.equal(true);
  });
});

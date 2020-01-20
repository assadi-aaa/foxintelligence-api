import { Module } from '@nestjs/common';
import { LocalStorageService } from './localStorage.service';

const getStorageInstance = async () => {
  const storage = new LocalStorageService();
  await storage.initStorage();
  return storage;
};

@Module({
  imports: [LocalStorageService],
  providers: [
    {
      provide: LocalStorageService,
      useValue: getStorageInstance(),
    },
  ],
  exports: [LocalStorageService],
})
export class StorageModule {
}

export interface WriteToFileService {
  handle<T>(fileName: string, data: T): void;
}

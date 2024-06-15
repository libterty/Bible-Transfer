import * as fs from "fs";
import * as path from "path";
import { WriteToFileService } from "../write-file.service";

export class WriteToFileServiceImpl<T> implements WriteToFileService {
  handle<T>(fileName: string, data: T): void {
    const target = path.join(path.dirname(require.main.filename), fileName);
    fs.writeFile(target, JSON.stringify(data), "utf8", function (err) {
      if (err) {
        throw err;
      } else {
        console.log("complete");
      }
    });
  }
}

import { fileURLToPath } from "node:url";
import path from "node:path";

export class FileUtils {
  static getFileName(fileURL: string) {
    return fileURLToPath(fileURL);
  }

  static getDirName(fileURL: string) {
    return path.dirname(this.getFileName(fileURL));
  }
}

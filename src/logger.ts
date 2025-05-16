import path from "path";
import { FileUtils } from "./lib/Utils/FileUtils.js";
import { FileLogger } from "./lib/logger/FileLogger.js";

const filePath = path.join(
  FileUtils.getDirName(import.meta.url),
  "../",
  "logs",
  "mcp-server.log"
);
export const logger = new FileLogger(filePath);

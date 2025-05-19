import { createLogger, Logger, transports } from "winston";

export class FileLogger {
  logger: Logger;

  constructor(private filePath: string) {
    this.logger = createLogger({
      transports: [
        new transports.File({
          filename: this.filePath,
        }),
      ],
    });
  }
  log(message: string): void {
    this.logger.info(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }
}

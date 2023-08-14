import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';

export class ConfigLoader {
  public static readonly logger = new Logger(ConfigLoader.name);

  public static initialize(environment = 'development') {
    const envPath = path.join(
      process.cwd(),
      './config/env',
      `${environment}.env`,
    );

    if (fs.existsSync(envPath)) {
      dotenv.config({
        path: envPath,
        debug: process.env.NODE_ENV === 'localhost',
      });
      ConfigLoader.logger.log(
        `Environment config loaded successfully from "${environment}.env"`,
      );
    } else
      ConfigLoader.logger.warn(
        `Could not locate environment file at "${environment}.env"`,
      );
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadModule } from './modules/lead/lead.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validationSchema, validationOptions } from '../config/validate.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from '../config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [appConfig],
      validationSchema,
      validationOptions,
    }),
    LeadModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

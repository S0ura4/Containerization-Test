import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from 'src/app/config/environment-config.module';
import { appDataSourceProviders } from './providers/appDatabase.provider';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [...appDataSourceProviders],
  exports: [...appDataSourceProviders],
})
export class PgDataServicesModule {}

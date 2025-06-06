import { HttpException } from '@nestjs/common';
import { EnvironmentConfigService } from 'src/app/config/environment-config.service';
import InjectableString from 'src/common/injectable.string';
import { DataSource, DataSourceOptions } from 'typeorm';

export const appDataSourceProviders = [
  {
    provide: InjectableString.APP_DATA_SOURCE,
    useFactory: async (config: EnvironmentConfigService) => {
      const dataSourceOptions: DataSourceOptions = {
        type: 'postgres',
        host: config.getDatabaseHost(),
        port: config.getDatabasePort(),
        username: config.getDatabaseUser(),
        password: config.getDatabasePassword(),
        database: config.getDatabaseName(),
        entities: ['dist/frameworks/data-services/pg/entities/**/*.entity{.ts,.js}'],
        synchronize: config.getDatabaseSync(),
      };

      try {
        const appDataSource = new DataSource(dataSourceOptions);
        await appDataSource.initialize();
        return appDataSource;
      } catch (error) {
        console.error('❌ Failed to initialize DataSource:', error);
        throw new HttpException(error.message || 'DataSource Init Failed', 500);
      }
    },

    inject: [EnvironmentConfigService],
  },
];

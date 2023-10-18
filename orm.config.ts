import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

function ormConfig(): TypeOrmModuleOptions {
    const commonConf = {
        SYNCHRONIZE: false,
        ENTITIES: [__dirname + '/**/*.entity{.ts,.js}'],
        MIGRATIONS: [__dirname + '/**/migrations/*{.ts,.js}'],
        MIGRATIONS_RUN: false,
        MIGRATIONS_TABLE_NAME: 'migrations',
    };

    return {
        name: 'default',
        type: 'mysql',
        database: 'test',
        host: 'localhost',
        port: Number(3306),
        username: 'root',
        password: '12345',
        logging: true,
        synchronize: commonConf.SYNCHRONIZE,
        entities: commonConf.ENTITIES,
        migrations: commonConf.MIGRATIONS,
        migrationsRun: commonConf.MIGRATIONS_RUN,
        migrationsTableName: commonConf.MIGRATIONS_TABLE_NAME,
    };
}

export { ormConfig };

export const AppDataSource = new DataSource({
      type: 'mysql',
  database: 'test',
  host: 'localhost',
  port: Number(3306),
  username: 'root',
  password: '12345',
  synchronize: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/**/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
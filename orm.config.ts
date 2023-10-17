import { TypeOrmModuleOptions } from "@nestjs/typeorm";

function ormConfig(): TypeOrmModuleOptions {
    const commonConf = {
        SYNCHRONIZE: false,
        ENTITIES: [__dirname + '/**/*.entity{.ts,.js}'],
        MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
        MIGRATIONS_RUN: false,
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
    };
}

export { ormConfig };
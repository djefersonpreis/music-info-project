import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'pguser',
    password: 'pgpassword',
    database: 'music_info4',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
};

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config';
import { MusicsModule } from './musics/musics.module';
import { SingersModule } from './singers/singers.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        WinstonModule.forRoot(winstonConfig),
        UsersModule,
        AuthModule,
        MusicsModule,
        SingersModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggerInterceptor,
        },
    ],
})
export class AppModule { }
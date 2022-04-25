import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule],
    controllers: [],
    providers: [UsersService],
})
export class AppModule { }

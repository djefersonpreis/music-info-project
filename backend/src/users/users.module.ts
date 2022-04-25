import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { UsersController } from './users.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository])],
    controllers: [UsersController],
})
export class UsersModule {}

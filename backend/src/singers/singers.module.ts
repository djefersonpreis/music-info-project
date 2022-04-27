import { Module } from '@nestjs/common';
import { SingerRepository } from './singers.repository';
import { SingersService } from './singers.service';
import { SingersController } from './singers.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([SingerRepository]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    providers: [SingersService],
    controllers: [SingersController]
})
export class SingersModule { }
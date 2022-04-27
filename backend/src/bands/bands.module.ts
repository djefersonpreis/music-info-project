import { Module } from '@nestjs/common';
import { BandRepository } from './bands.repository';
import { BandsService } from './bands.service';
import { BandsController } from './bands.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([BandRepository]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    providers: [BandsService],
    controllers: [BandsController]
})
export class BandsModule { }
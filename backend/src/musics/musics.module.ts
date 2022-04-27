import { Module } from '@nestjs/common';
import { MusicRepository } from './musics.repository';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([MusicRepository]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    providers: [MusicsService],
    controllers: [MusicsController]
})
export class MusicsModule { }
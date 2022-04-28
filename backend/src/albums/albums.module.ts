import { Module } from '@nestjs/common';
import { AlbumRepository } from './albums.repository';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([AlbumRepository]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    providers: [AlbumsService],
    controllers: [AlbumsController]
})
export class AlbumsModule { }
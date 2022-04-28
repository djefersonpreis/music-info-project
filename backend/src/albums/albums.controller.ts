import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    UseGuards,
    Get,
    Param,
    Patch,
    ForbiddenException,
    Delete,
    Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { GetUser } from '../auth/get-user.decorator';

import { AlbumsService } from './albums.service';
import { Album } from './entities/album.entity';

import { CreateAlbumDto } from './dto/create-album.dto';
import { ReturnAlbumDto } from './dto/return-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FindAlbumQueryDto } from './dto/find-album-query.dto';

@Controller('album')
export class AlbumsController {
    constructor(private albumsService: AlbumsService) { }

    @Post()
    async create(
        @Body() createAlbumDto: CreateAlbumDto,
    ): Promise<ReturnAlbumDto> {
        const album = await this.albumsService.create(createAlbumDto);
        return {
            album,
            message: 'album cadastrado com sucesso',
        };
    }

    @Get(':id')
    async findById(@Param('id') id): Promise<ReturnAlbumDto> {
        const album = await this.albumsService.findById(id);
        return {
            album,
            message: 'Album encontrado',
        };
    }

    @Patch(':id')
    async update(
        @Body(ValidationPipe) updateAlbumDto: UpdateAlbumDto,
        @Param('id') id: string,
    ) {
        return this.albumsService.update(updateAlbumDto, id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.albumsService.delete(id);
        return {
            message: 'Album removido com sucesso',
        };
    }

    @Get()
    async find(@Query() query: FindAlbumQueryDto) {
        const found = await this.albumsService.find(query);
        return {
            found,
            message: 'Albums encontrados',
        };
    }
}
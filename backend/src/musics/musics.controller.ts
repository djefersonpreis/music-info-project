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

import { MusicsService } from './musics.service';
import { Music } from './entities/music.entity';

import { CreateMusicDto } from './dto/create-music.dto';
import { ReturnMusicDto } from './dto/return-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { FindMusicQueryDto } from './dto/find-music-query.dto';

@Controller('music')
export class MusicsController {
    constructor(private musicsService: MusicsService) { }

    @Post()
    async create(
        @Body() createMusicDto: CreateMusicDto,
    ): Promise<ReturnMusicDto> {
        const music = await this.musicsService.create(createMusicDto);
        return {
            music,
            message: 'Música cadastrada com sucesso',
        };
    }

    @Get(':id')
    async findById(@Param('id') id): Promise<ReturnMusicDto> {
        const music = await this.musicsService.findById(id);
        return {
            music,
            message: 'Música encontrada',
        };
    }

    @Patch(':id')
    async update(
        @Body(ValidationPipe) updateMusicDto: UpdateMusicDto,
        @Param('id') id: string,
    ) {
        return this.musicsService.update(updateMusicDto, id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.musicsService.delete(id);
        return {
            message: 'Música removida com sucesso',
        };
    }

    @Get()
    async find(@Query() query: FindMusicQueryDto) {
        const found = await this.musicsService.find(query);
        return {
            found,
            message: 'Musicas encontrados',
        };
    }
}
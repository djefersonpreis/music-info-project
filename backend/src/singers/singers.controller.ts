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

import { SingersService } from './singers.service';
import { Singer } from './entities/singer.entity';

import { CreateSingerDto } from './dto/create-singer.dto';
import { ReturnSingerDto } from './dto/return-singer.dto';
import { UpdateSingerDto } from './dto/update-singer.dto';
import { FindSingerQueryDto } from './dto/find-singer-query.dto';

@Controller('singer')
export class SingersController {
    constructor(private singersService: SingersService) { }

    @Post()
    async create(
        @Body() createSingerDto: CreateSingerDto,
    ): Promise<ReturnSingerDto> {
        const singer = await this.singersService.create(createSingerDto);
        return {
            singer,
            message: 'Cantor cadastrado com sucesso',
        };
    }

    @Get(':id')
    async findById(@Param('id') id): Promise<ReturnSingerDto> {
        const singer = await this.singersService.findById(id);
        return {
            singer,
            message: 'Cantor encontrada',
        };
    }

    @Patch(':id')
    async update(
        @Body(ValidationPipe) updateSingerDto: UpdateSingerDto,
        @Param('id') id: string,
    ) {
        return this.singersService.update(updateSingerDto, id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.singersService.delete(id);
        return {
            message: 'Cantor removido com sucesso',
        };
    }

    @Get()
    async find(@Query() query: FindSingerQueryDto) {
        const found = await this.singersService.find(query);
        return {
            found,
            message: 'Cantores encontrados',
        };
    }
}
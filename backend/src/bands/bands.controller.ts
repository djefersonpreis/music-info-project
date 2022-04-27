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

import { BandsService } from './bands.service';
import { Band } from './entities/band.entity';

import { CreateBandDto } from './dto/create-band.dto';
import { ReturnBandDto } from './dto/return-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';
import { FindBandQueryDto } from './dto/find-band-query.dto';

@Controller('band')
export class BandsController {
    constructor(private bandsService: BandsService) { }

    @Post()
    async create(
        @Body() createBandDto: CreateBandDto,
    ): Promise<ReturnBandDto> {
        const band = await this.bandsService.create(createBandDto);
        return {
            band,
            message: 'banda cadastrada com sucesso',
        };
    }

    @Get(':id')
    async findById(@Param('id') id): Promise<ReturnBandDto> {
        const band = await this.bandsService.findById(id);
        return {
            band,
            message: 'Banda encontrada',
        };
    }

    @Patch(':id')
    async update(
        @Body(ValidationPipe) updateBandDto: UpdateBandDto,
        @Param('id') id: string,
    ) {
        return this.bandsService.update(updateBandDto, id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.bandsService.delete(id);
        return {
            message: 'Banda removida com sucesso',
        };
    }

    @Get()
    async find(@Query() query: FindBandQueryDto) {
        const found = await this.bandsService.find(query);
        return {
            found,
            message: 'Bandas encontradas',
        };
    }
}
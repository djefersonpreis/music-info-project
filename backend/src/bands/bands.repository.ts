
import { Repository } from 'typeorm';
import { Band } from './entities/band.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { FindBandQueryDto } from './dto/find-band-query.dto';
import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { CreateBandDto } from './dto/create-band.dto';

@CustomRepository(Band)
export class BandRepository extends Repository<Band> {

    public async findBands(
        queryDto: FindBandQueryDto,
    ): Promise<{ bands: Band[]; total: number }> {
        queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
        queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;

        const { name, creation_date } = queryDto;
        const query = this.createQueryBuilder('band');

        if (creation_date) {
            query.andWhere('band.creation_date ILIKE :creation_date', { creation_date: `%${creation_date}%` });
        }

        if (name) {
            query.andWhere('band.name ILIKE :name', { name: `%${name}%` });
        }

        // query.skip((queryDto.page - 1) * queryDto.limit);
        // query.take(+queryDto.limit);
        query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
        query.select(['band.name', 'band.creation_date']);

        const [bands, total] = await query.getManyAndCount();

        return { bands, total };
    }

    public async createBand(
        createBandDto: CreateBandDto
    ): Promise<Band> {
        const { name, image_url, creation_date } = createBandDto;

        const band = this.create();
        band.name = name;
        band.image_url = image_url;
        band.creation_date = creation_date
        try {
            await band.save();
            return band;
        } catch (error) {
            throw new InternalServerErrorException(
                'Erro ao salvar a banda no banco de dados',
            );
        }
    }
}

import { Repository } from 'typeorm';
import { Singer } from './entities/singer.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { FindSingerQueryDto } from './dto/find-singer-query.dto';
import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { CreateSingerDto } from './dto/create-singer.dto';

@CustomRepository(Singer)
export class SingerRepository extends Repository<Singer> {

    public async findSingers(
        queryDto: FindSingerQueryDto,
    ): Promise<{ singers: Singer[]; total: number }> {
        queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
        queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;

        const { name, birth_date } = queryDto;
        const query = this.createQueryBuilder('singer');

        if (birth_date) {
            query.andWhere('singer.birth_date ILIKE :birth_date', { birth_date: `%${birth_date}%` });
        }

        if (name) {
            query.andWhere('singer.name ILIKE :name', { name: `%${name}%` });
        }

        // query.skip((queryDto.page - 1) * queryDto.limit);
        // query.take(+queryDto.limit);
        query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
        query.select(['singer.id', 'singer.name', 'singer.birth_date', 'singer.image_url']);

        const [singers, total] = await query.getManyAndCount();

        return { singers, total };
    }

    public async createSinger(
        createSingerDto: CreateSingerDto
    ): Promise<Singer> {
        const { name, image_url, birth_date } = createSingerDto;

        const singer = this.create();
        singer.name = name;
        singer.image_url = image_url;
        singer.birth_date = birth_date
        try {
            await singer.save();
            return singer;
        } catch (error) {
            throw new InternalServerErrorException(
                'Erro ao salvar o cantor no banco de dados',
            );
        }
    }
}
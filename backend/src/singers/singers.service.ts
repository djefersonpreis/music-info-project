import {
    Injectable,
    NotFoundException,
    InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Singer } from './entities/singer.entity';
import { FindSingerQueryDto } from './dto/find-singer-query.dto';
import { CreateSingerDto } from './dto/create-singer.dto';
import { UpdateSingerDto } from './dto/update-singer.dto';
import { SingerRepository } from './singers.repository';

@Injectable()
export class SingersService {
    constructor(
        @InjectRepository(SingerRepository)
        private singerRepository: SingerRepository,
    ) { }

    async create(createSingerDto: CreateSingerDto): Promise<Singer> {
        return this.singerRepository.createSinger(createSingerDto);
    }

    async findById(singerId: string): Promise<Singer> {
        const singer = await this.singerRepository.findOne({
            select: ['name', 'image_url', 'birth_date', 'id'], where: { id: singerId }
        });

        if (!singer) throw new NotFoundException('Cantor não encontrada');

        return singer;
    }

    async update(updateSingerDto: UpdateSingerDto, id: string): Promise<Singer> {
        const singer = await this.findById(id);
        const { name, image_url, birth_date } = updateSingerDto;
        singer.name = name ? name : singer.name;
        singer.image_url = image_url ? image_url : singer.image_url;
        singer.birth_date = birth_date ? birth_date : singer.birth_date;
        try {
            await singer.save();
            return singer;
        } catch (error) {
            throw new InternalServerErrorException(
                'Erro ao salvar os dados no banco de dados',
            );
        }
    }

    async delete(singerId: string) {
        const result = await this.singerRepository.delete({ id: singerId });
        if (result.affected === 0) {
            throw new NotFoundException(
                'Não foi encontrado um cantor com o ID informado',
            );
        }
    }

    async find(
        queryDto: FindSingerQueryDto,
    ): Promise<Singer[]> {
        const singers = await this.singerRepository.find();
        return singers;
    }
}
import {
    Injectable,
    NotFoundException,
    InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Band } from './entities/band.entity';
import { FindBandQueryDto } from './dto/find-band-query.dto';
import { CreateBandDto } from './dto/create-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';
import { BandRepository } from './bands.repository';

@Injectable()
export class BandsService {
    constructor(
        @InjectRepository(BandRepository)
        private bandRepository: BandRepository,
    ) { }

    async create(createBandDto: CreateBandDto): Promise<Band> {
        return this.bandRepository.createBand(createBandDto);
    }

    async findById(bandId: string): Promise<Band> {
        const band = await this.bandRepository.findOne({
            select: ['name', 'image_url', 'creation_date', 'id'], where: { id: bandId }
        });

        if (!band) throw new NotFoundException('Banda não encontrada');

        return band;
    }

    async update(updateBandDto: UpdateBandDto, id: string): Promise<Band> {
        const band = await this.findById(id);
        const { name, image_url, creation_date } = updateBandDto;
        band.name = name ? name : band.name;
        band.image_url = image_url ? image_url : band.image_url;
        band.creation_date = creation_date ? creation_date : band.creation_date;
        try {
            await band.save();
            return band;
        } catch (error) {
            throw new InternalServerErrorException(
                'Erro ao salvar os dados no banco de dados',
            );
        }
    }

    async delete(bandId: string) {
        const result = await this.bandRepository.delete({ id: bandId });
        if (result.affected === 0) {
            throw new NotFoundException(
                'Não foi encontrado uma Banda com o ID informado',
            );
        }
    }

    async find(
        queryDto: FindBandQueryDto,
    ): Promise<Band[]> {
        const bands = await this.bandRepository.find();
        return bands;
    }
}
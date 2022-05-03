import {
    Injectable,
    NotFoundException,
    InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { FindMusicQueryDto } from './dto/find-music-query.dto';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicRepository } from './musics.repository';

@Injectable()
export class MusicsService {
    constructor(
        @InjectRepository(MusicRepository)
        private musicRepository: MusicRepository,
    ) { }

    async create(createMusicDto: CreateMusicDto): Promise<Music> {
        return this.musicRepository.createMusic(createMusicDto);
    }

    async update(updateMusicDto: UpdateMusicDto, id: string): Promise<Music> {
        const music = await this.findById(id);
        const { name, image_url, release_date, bands } = updateMusicDto;
        music.name = name ? name : music.name;
        music.image_url = image_url ? image_url : music.image_url;
        music.release_date = release_date ? release_date : music.release_date;
        music.bands = bands ? bands : music.bands;
        try {
            await music.save();
            return music;
        } catch (error) {
            throw new InternalServerErrorException(
                'Erro ao salvar os dados no banco de dados',
            );
        }
    }

    async delete(musicId: string) {
        const result = await this.musicRepository.delete({ id: musicId });
        if (result.affected === 0) {
            throw new NotFoundException(
                'Não foi encontrado uma música com o ID informado',
            );
        }
    }

    async find(
        queryDto: FindMusicQueryDto,
    ): Promise<Music[]> {
        const musics = await this.musicRepository.find({relations: ['bands']});
        return musics;
    }

    async findById(musicId: string): Promise<Music> {
        const music = await this.musicRepository.findOne({ where: { id: musicId }, relations: ['bands'] });

        if (!music) throw new NotFoundException('Musica não encontrada');

        return music;
    }
}
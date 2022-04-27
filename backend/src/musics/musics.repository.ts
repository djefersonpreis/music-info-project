
import { Repository } from 'typeorm';
import { Music } from './entities/music.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { FindMusicQueryDto } from './dto/find-music-query.dto';
import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { CreateMusicDto } from './dto/create-music.dto';

@CustomRepository(Music)
export class MusicRepository extends Repository<Music> {

    public async findMusics(
        queryDto: FindMusicQueryDto,
    ): Promise<{ musics: Music[]; total: number }> {
        queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
        queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;

        const { name, release_date } = queryDto;
        const query = this.createQueryBuilder('user');

        if (release_date) {
            query.andWhere('music.release_date ILIKE :release_date', { release_date: `%${release_date}%` });
        }

        if (name) {
            query.andWhere('music.name ILIKE :name', { name: `%${name}%` });
        }

        // query.skip((queryDto.page - 1) * queryDto.limit);
        // query.take(+queryDto.limit);
        query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
        query.select(['music.name', 'music.release_date']);

        const [musics, total] = await query.getManyAndCount();

        return { musics, total };
    }

    public async createMusic(
        createMusicDto: CreateMusicDto
    ): Promise<Music> {
        const { name, image_url, release_date } = createMusicDto;

        const music = this.create();
        music.name = name;
        music.image_url = image_url;
        music.release_date = release_date
        try {
            await music.save();
            return music;
        } catch (error) {
            throw new InternalServerErrorException(
                'Erro ao salvar a música no banco de dados',
            );
        }
    }
}
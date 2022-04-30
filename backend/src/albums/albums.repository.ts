
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { FindAlbumQueryDto } from './dto/find-album-query.dto';
import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { CreateAlbumDto } from './dto/create-album.dto';

@CustomRepository(Album)
export class AlbumRepository extends Repository<Album> {

    public async findAlbums(
        queryDto: FindAlbumQueryDto,
    ): Promise<{ albums: Album[]; total: number }> {
        queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
        queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;

        const { name, release_date } = queryDto;
        const query = this.createQueryBuilder('album');

        if (release_date) {
            query.andWhere('album.release_date ILIKE :release_date', { release_date: `%${release_date}%` });
        }

        if (name) {
            query.andWhere('album.name ILIKE :name', { name: `%${name}%` });
        }

        // query.skip((queryDto.page - 1) * queryDto.limit);
        // query.take(+queryDto.limit);
        query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
        query.select(['album.id', 'album.name', 'album.release_date', 'album.image_url']);

        const [albums, total] = await query.getManyAndCount();

        return { albums, total };
    }

    public async createAlbum(
        createAlbumDto: CreateAlbumDto
    ): Promise<Album> {
        const { name, image_url, release_date, singer, band } = createAlbumDto;

        const album = this.create();
        album.name = name;
        album.image_url = image_url;
        album.release_date = release_date;
        album.singer = singer;
        album.band = band;
        try {
            await album.save();
            return album;
        } catch (error) {
            throw new InternalServerErrorException(
                'Erro ao salvar a albu no banco de dados',
            );
        }
    }
}
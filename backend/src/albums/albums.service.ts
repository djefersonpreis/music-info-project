import {
    Injectable,
    NotFoundException,
    InternalServerErrorException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { FindAlbumQueryDto } from './dto/find-album-query.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './albums.repository';

@Injectable()
export class AlbumsService {
    constructor(
        @InjectRepository(AlbumRepository)
        private albumRepository: AlbumRepository,
    ) { }

    async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
        return this.albumRepository.createAlbum(createAlbumDto);
    }

    async update(updateAlbumDto: UpdateAlbumDto, id: string): Promise<Album> {
        const album = await this.findById(id);
        const { name, image_url, release_date, singer, band, musics } = updateAlbumDto;
        album.name = name ? name : album.name;
        album.image_url = image_url ? image_url : album.image_url;
        album.release_date = release_date ? release_date : album.release_date;
        album.singer = singer ? singer : album.singer;
        album.band = band ? band : album.band;
        album.musics = musics ? musics : album.musics
        try {
            await album.save();
            return album;
        } catch (error) {
            throw new InternalServerErrorException(
                'Erro ao salvar os dados no banco de dados',
            );
        }
    }

    async delete(albumId: string) {
        const result = await this.albumRepository.delete({ id: albumId });
        if (result.affected === 0) {
            throw new NotFoundException(
                'Não foi encontrado uma Album com o ID informado',
            );
        }
    }

    async find(
        queryDto: FindAlbumQueryDto,
    ): Promise<Album[]> {
        const albums = await this.albumRepository.find({ relations: ['singer', 'band', 'musics'] });
        return albums;
    }

    async findById(albumId: string): Promise<Album> {
        const album = await this.albumRepository.findOne({ where: { id: albumId }, relations: ['singer', 'band', 'musics'] });

        if (!album) throw new NotFoundException('Albuma não encontrada');

        return album;
    }
}
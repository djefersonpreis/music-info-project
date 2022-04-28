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

    async findById(albumId: string): Promise<Album> {
        const album = await this.albumRepository.findOne({
            select: ['name', 'image_url', 'release_date', 'singer', 'band', 'id'], where: { id: albumId }
        });

        if (!album) throw new NotFoundException('Albuma não encontrada');

        return album;
    }

    async update(updateAlbumDto: UpdateAlbumDto, id: string): Promise<Album> {
        const album = await this.findById(id);
        const { name, image_url, release_date, singer, band } = updateAlbumDto;
        album.name = name ? name : album.name;
        album.image_url = image_url ? image_url : album.image_url;
        album.release_date = release_date ? release_date : album.release_date;
        album.singer = singer ? singer : album.singer;
        album.band = band ? band : album.band;
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
    ): Promise<{ albums: Album[]; total: number }> {
        const albums = await this.albumRepository.findAlbums(queryDto);
        return albums;
    }
}
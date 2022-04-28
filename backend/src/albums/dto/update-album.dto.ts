import { IsString, IsOptional } from 'class-validator';
import { Singer } from '../../singers/entities/singer.entity';
import { Band } from '../../bands/entities/band.entity';

export class UpdateAlbumDto {
    @IsOptional()
    @IsString({
        message: 'Informe o nome da Albuma',
    })
    name: string;

    @IsOptional()
    @IsString({
        message: 'Informe uma URL para imagem da banda',
    })
    image_url: string;

    @IsOptional()
    release_date: string;

    singer: Singer;

    band: Band;
}
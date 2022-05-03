import {
    IsNotEmpty,
    MaxLength
} from 'class-validator';
import { Band } from 'src/bands/entities/band.entity';
import { Singer } from 'src/singers/entities/singer.entity';

export class CreateAlbumDto {
    @IsNotEmpty({
        message: 'Informe o nome da Albuma',
    })
    @MaxLength(200, {
        message: 'O nome deve ter menos de 200 caracteres',
    })
    name: string;

    image_url: string;

    @IsNotEmpty({
        message: 'Informe a Data de Criação da Albuma.',
    })
    release_date: string;

    singer: Singer;

    band: Band;
}

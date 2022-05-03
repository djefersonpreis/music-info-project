import {
    IsNotEmpty,
    MaxLength
} from 'class-validator';
import { Band } from 'src/bands/entities/band.entity';

export class CreateMusicDto {
    @IsNotEmpty({
        message: 'Informe o nome da música',
    })
    @MaxLength(200, {
        message: 'O nome deve ter menos de 200 caracteres',
    })
    name: string;

    image_url: string;

    @IsNotEmpty({
        message: 'Informe a Data de Lançamento da Música.',
    })
    release_date: string;

    bands: Band[]
}

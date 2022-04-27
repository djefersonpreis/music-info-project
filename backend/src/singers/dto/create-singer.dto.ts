import {
    IsNotEmpty,
    MaxLength
} from 'class-validator';

export class CreateSingerDto {
    @IsNotEmpty({
        message: 'Informe o nome do Cantor',
    })
    @MaxLength(200, {
        message: 'O nome deve ter menos de 200 caracteres',
    })
    name: string;

    image_url: string;

    @IsNotEmpty({
        message: 'Informe a Data de Nascimento do Cantor.',
    })
    birth_date: string;
}

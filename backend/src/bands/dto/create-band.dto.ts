import {
    IsNotEmpty,
    MaxLength
} from 'class-validator';

export class CreateBandDto {
    @IsNotEmpty({
        message: 'Informe o nome da Banda',
    })
    @MaxLength(200, {
        message: 'O nome deve ter menos de 200 caracteres',
    })
    name: string;

    image_url: string;

    @IsNotEmpty({
        message: 'Informe a Data de Criação da Banda.',
    })
    creation_date: string;
}

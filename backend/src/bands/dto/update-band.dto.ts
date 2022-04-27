import { IsString, IsOptional } from 'class-validator';

export class UpdateBandDto {
    @IsOptional()
    @IsString({
        message: 'Informe o nome da Banda',
    })
    name: string;

    @IsOptional()
    @IsString({
        message: 'Informe uma URL para imagem da banda',
    })
    image_url: string;

    @IsOptional()
    creation_date: string;
}
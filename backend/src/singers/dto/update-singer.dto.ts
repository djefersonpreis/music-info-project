import { IsString, IsOptional } from 'class-validator';

export class UpdateSingerDto {
    @IsOptional()
    @IsString({
        message: 'Informe o nome do cantor',
    })
    name: string;

    @IsOptional()
    @IsString({
        message: 'Informe uma URL para o cantor',
    })
    image_url: string;

    @IsOptional()
    birth_date: string;
}
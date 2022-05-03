import { IsString, IsOptional } from 'class-validator';
import { Band } from 'src/bands/entities/band.entity';

export class UpdateMusicDto {
    @IsOptional()
    @IsString({
        message: 'Informe um nome para a música',
    })
    name: string;

    @IsOptional()
    @IsString({
        message: 'Informe uma URL para a Música',
    })
    image_url: string;

    @IsOptional()
    release_date: string;

    bands: Band[];
}
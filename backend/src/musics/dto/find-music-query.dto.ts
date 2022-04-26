import { BaseQueryParametersDto } from '../../shared/dto/base-query-parameters.dto';

export class FindMusicQueryDto extends BaseQueryParametersDto {
    name: string;
    release_date: string;
}
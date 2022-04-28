import { BaseQueryParametersDto } from '../../shared/dto/base-query-parameters.dto';

export class FindAlbumQueryDto extends BaseQueryParametersDto {
    name: string;
    release_date: string;
}
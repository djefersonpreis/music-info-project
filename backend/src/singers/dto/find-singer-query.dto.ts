import { BaseQueryParametersDto } from '../../shared/dto/base-query-parameters.dto';

export class FindSingerQueryDto extends BaseQueryParametersDto {
    name: string;
    birth_date: string;
}
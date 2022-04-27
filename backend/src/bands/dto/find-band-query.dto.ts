import { BaseQueryParametersDto } from '../../shared/dto/base-query-parameters.dto';

export class FindBandQueryDto extends BaseQueryParametersDto {
    name: string;
    creation_date: string;
}
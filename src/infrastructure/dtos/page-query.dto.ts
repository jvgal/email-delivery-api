import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { OrderOptions, SortOptions } from '../interfaces/query-options.interface';

export class PageQueryDto<T> {
  @IsOptional()
  @IsString()
  readonly searchBy?: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly pageIndex: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100, {
    message: 'O valor máximo de itens por página não pode ser maior que 100',
  })
  @IsOptional()
  readonly pageSize: number = 10;

  @IsString()
  @IsOptional()
  readonly orderBy?: OrderOptions | keyof T = OrderOptions.updatedAt;

  @IsEnum(SortOptions)
  @IsOptional()
  readonly direction?: SortOptions = SortOptions.desc;

  get skip(): number {
    return (this.pageIndex - 1) * this.pageSize;
  }
}

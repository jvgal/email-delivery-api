import { IsArray, IsNumber } from 'class-validator';

export class PageDto<T> {
  @IsArray()
  readonly data: T[];

  @IsNumber()
  readonly total: number;

  constructor(data: T[], total: number) {
    this.data = data;
    this.total = total;
  }
}

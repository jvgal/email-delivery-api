import { Injectable } from '@nestjs/common';
import { Model, PopulateOption, ProjectionType } from 'mongoose';
import {
  OrderOptions,
  QueryOptions,
  SortOptions,
} from 'src/infrastructure/interfaces/query-options.interface';
import { BaseFilterQuery } from 'src/infrastructure/types/filter-query.type';

@Injectable()
export class BaseService<M> {
  constructor(protected model: Model<M>) {}

  findByQuery(
    filterQuery: BaseFilterQuery<M>,
    queryOptions: QueryOptions<M> = {},
    searchByFields: (keyof M)[] = [],
    projection?: ProjectionType<M>,
    populate?: PopulateOption['populate'],
    includeEnabled: boolean = false,
  ): Promise<M[]> {
    const {
      searchBy,
      limit,
      skip,
      sort = SortOptions.desc,
      order = OrderOptions.updatedAt,
    } = queryOptions;

    return this.model.find(
      {
        ...filterQuery,
        ...(searchBy &&
          searchByFields?.length > 0 && {
            $or: searchByFields.map((field: any) => ({
              [field]: { $regex: searchBy, $options: 'i' },
            })),
          }),
        deleted: false,
        ...(includeEnabled
          ? { ...('enabled' in this.model.schema.paths && { enabled: true }) }
          : null),
      },
      projection ?? null,
      {
        limit,
        skip,
        sort: {
          [order]: sort,
        },
        populate,
      },
    );
  }

  count(
    filterQuery: BaseFilterQuery<M>,
    { searchBy }: Pick<QueryOptions<M>, 'searchBy'> = { searchBy: undefined },
    searchByFields: (keyof M)[] = [],
    includeEnabled: boolean = false,
  ): Promise<number> {
    return this.model.countDocuments({
      ...filterQuery,
      ...(searchBy &&
        searchByFields?.length > 0 && {
          $or: searchByFields.map((field: any) => ({
            [field]: { $regex: searchBy, $options: 'i' },
          })),
        }),
      deleted: false,
      ...(includeEnabled
        ? { ...('enabled' in this.model.schema.paths && { enabled: true }) }
        : null),
    });
  }
}

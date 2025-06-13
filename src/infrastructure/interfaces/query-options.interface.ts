export enum SortOptions {
  desc = 'desc',
  asc = 'asc',
}

export enum OrderOptions {
  updatedAt = 'updatedAt',
  createdAt = 'createdAt',
}

export interface QueryOptions<T> {
  skip?: number;
  limit?: number;
  order?: keyof T | OrderOptions;
  sort?: SortOptions;
  searchBy?: string;
}

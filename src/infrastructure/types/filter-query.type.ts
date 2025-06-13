import { FilterQuery } from 'mongoose';

export type BaseFilterQuery<M> = FilterQuery<M> & { clientId: number };

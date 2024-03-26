export type FindConditions<T> = Partial<T>;

export enum OrderDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type PaginatedFindConditions<T> = {
  page?: number
  itemsPerPage?: number
  conditions?: FindConditions<T>
  orderBy?: keyof T
  orderDirection?: OrderDirection
};

export type Page<T> = {
  page: number
  totalRows: number
  rows: T[]
};

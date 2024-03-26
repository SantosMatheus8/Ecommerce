import { FindConditions, Page, PaginatedFindConditions } from "../dtos/generic";

export interface Repository<T> {
  insert(entity: T): Promise<T>
  update(entity: T): Promise<T>
  delete(entity: T): Promise<void>

  insertMany(entities: T[]): Promise<T[]>
  updateMany(entities: T[]): Promise<T[]>
  deleteMany(entities: T[]): Promise<void>

  findOneBy(conditions: FindConditions<T>): Promise<T | null>
  findBy(conditions: FindConditions<T>): Promise<T[]>
  paginatedFindBy(conditions: PaginatedFindConditions<T>): Promise<Page<T>>
}

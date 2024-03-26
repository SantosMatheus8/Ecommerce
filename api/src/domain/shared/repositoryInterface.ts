export interface RepositoryInterface<T> {
  save(entity: T): Promise<T>
  delete(id: number): Promise<void>
  findById(id: number): Promise<T>
  findAll(): Promise<T[]>
  update(entity: Partial<T>): Promise<T>
}

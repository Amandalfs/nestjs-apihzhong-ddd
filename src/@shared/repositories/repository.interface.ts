export abstract class RepositoryInterface<T> {
  abstract create(entity: T): Promise<void>;
  abstract update(entity: T): Promise<void>;
  abstract findById(id: string): Promise<T>;
  abstract findAll(): Promise<T[]>;
}

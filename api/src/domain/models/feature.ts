export class Feature {
  id?: number;
  description: string;
  active: boolean;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(description: string, active: boolean, isAdmin: boolean, id?: number, createdAt?: Date, updatedAt?: Date) {
    this.id = id;
    this.description = description;
    this.active = active;
    this.isAdmin = isAdmin;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

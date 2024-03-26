export enum FeatureOrderByEnum {
  id = "id",
  description = "description",
  active = "active",
  isAdmin = "is_admin",
}

export type QueryFeature = {
  active: string
  isAdmin: string
  page: string
  itemsPerPage: string
  orderDirection?: string
  orderBy?: string
};

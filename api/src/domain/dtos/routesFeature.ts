export enum RoutesFeatureOrderByEnum {
  id = "id",
  uri = "uri",
  isPublic = "is_public",
  verb = "verb",
}

export type QueryRoutesFeature = {
  isPublic: string
  verb: string
  uri: string
  page: string
  itemsPerPage: string
  orderDirection?: string
  orderBy?: string
};

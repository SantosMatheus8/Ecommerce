export class RoutesFeature {
  id?: number;
  uri: string;
  verb: string;
  isPublic: boolean;

  constructor(uri: string, verb: string, isPublic: boolean, id?: number) {
    this.id = id;
    this.uri = uri;
    this.verb = verb;
    this.isPublic = isPublic;
  }
}

import { Request, Response } from "express";
import { AccessProfileOrderByEnum, AccessProfileResponse, AccessProfileResponseWithFeatures, AccessProfileUsersAssociationResponse, AssociateUsersAccessProfileResponse, CreateAccessProfile, QueryAccessProfile } from "../../domain/dtos/accessProfile";
import { AccessProfileUseCase } from "../../use-cases/accessProfileUseCase";
import { FeatureOrderByEnum, QueryFeature } from "../../domain/dtos/feature";
import { QueryRoutesFeature, RoutesFeatureOrderByEnum } from "../../domain/dtos/routesFeature";
import { AccessProfile } from "../../domain/models/accessProfile";
import { QueryRequest } from "../dtos/request";
import { OrderDirection, PaginatedFindConditions } from "../../domain/dtos/generic";
import { Feature } from "../../domain/models/feature";
import { RoutesFeature } from "../../domain/models/routesFeature";

export class AccessProfileController {
  constructor(private accessProfileUseCase: AccessProfileUseCase) {}

  public async create(
    req: Request<unknown, CreateAccessProfile>,
    res: Response
  ): Promise<void> {
    const createAccessProfile = req.body;
    const accessProfile = await this.accessProfileUseCase.create(createAccessProfile);
    const simpleAccessProfile = this.toSimpleAccessProfilesWithFeatures(accessProfile);

    res.status(201).send(simpleAccessProfile);
  }

  public async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const accessProfile = await this.accessProfileUseCase.findById(+id);
    const simpleAccessProfile = this.toSimpleAccessProfilesWithFeatures(accessProfile);

    res.status(200).send(simpleAccessProfile);
  }

  public async findAll(req: QueryRequest<QueryAccessProfile>, res: Response): Promise<void> {
    const query: PaginatedFindConditions<AccessProfile> = {
      conditions: {},
      page: parseInt(req.query.page),
      itemsPerPage: parseInt(req.query.itemsPerPage),
    };
    if (req.query.name) {
      query.conditions.name = req.query.name;
    }
    if (req.query.admin) {
      query.conditions.admin = (req.query.admin === "true");
    }
    if (req.query.orderBy && AccessProfileOrderByEnum[req.query.orderBy]) {
      query.orderBy = AccessProfileOrderByEnum[req.query.orderBy];
    }
    if (req.query.orderDirection && OrderDirection[req.query.orderDirection]) {
      query.orderDirection = OrderDirection[req.query.orderDirection];
    }

    const accessProfile = await this.accessProfileUseCase.findAll(query);

    res.status(200).send(accessProfile);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updateAccessProfile = req.body;

    const accessProfile = await this.accessProfileUseCase.update(+id, updateAccessProfile);
    const simpleAccessProfile = this.toSimpleAccessProfilesWithFeatures(accessProfile);

    res.status(200).send(simpleAccessProfile);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await this.accessProfileUseCase.delete(+id);

    res.status(204).send();
  }

  public async associateUsers(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const associateUsersAccessProfile = req.body;

    const accesProfileUserAssociation = await this.accessProfileUseCase.associateUsers(+id, associateUsersAccessProfile);
    const accessProfilesDetaild = this.toDetailedAccessProfileWithUsers(accesProfileUserAssociation);

    res.status(201).send(accessProfilesDetaild);
  }

  public async findAllRoutesFeature(req: QueryRequest<QueryRoutesFeature>, res: Response): Promise<void> {
    const query: PaginatedFindConditions<RoutesFeature> = {
      conditions: {},
      page: parseInt(req.query.page),
      itemsPerPage: parseInt(req.query.itemsPerPage),
    };
    if (req.query.isPublic) {
      query.conditions.isPublic = (req.query.isPublic === "true");
    }
    if (req.query.verb) {
      query.conditions.verb = req.query.verb;
    }
    if (req.query.uri) {
      query.conditions.uri = req.query.uri;
    }
    if (req.query.orderBy && RoutesFeatureOrderByEnum[req.query.orderBy]) {
      query.orderBy = RoutesFeatureOrderByEnum[req.query.orderBy];
    }
    if (req.query.orderDirection && OrderDirection[req.query.orderDirection]) {
      query.orderDirection = OrderDirection[req.query.orderDirection];
    }

    const routesFeature = await this.accessProfileUseCase.findAllRoutesFeature(query);

    res.status(200).send(routesFeature);
  }

  public async findAllFeature(req: QueryRequest<QueryFeature>, res: Response): Promise<void> {
    const query: PaginatedFindConditions<Feature> = {
      conditions: {},
      page: parseInt(req.query.page),
      itemsPerPage: parseInt(req.query.itemsPerPage),
    };

    if (req.query.active) {
      query.conditions.active = (req.query.active === "true");
    }
    if (req.query.isAdmin) {
      query.conditions.isAdmin = (req.query.isAdmin === "true");
    }
    if (req.query.orderBy && FeatureOrderByEnum[req.query.orderBy]) {
      query.orderBy = FeatureOrderByEnum[req.query.orderBy];
    }
    if (req.query.orderDirection && OrderDirection[req.query.orderDirection]) {
      query.orderDirection = OrderDirection[req.query.orderDirection];
    }

    const accessProfile = await this.accessProfileUseCase.findAllFeature(query);

    res.status(200).send(accessProfile);
  }

  private toSimpleAccessProfiles(accessProfile: AccessProfile): AccessProfileResponse {
    return {
      id: accessProfile.id,
      name: accessProfile.name,
      admin: accessProfile.admin,
      createdAt: accessProfile.createdAt,
      updatedAt: accessProfile.updatedAt,
    };
  }

  private toDetailedAccessProfileWithUsers(
    userAccessProfile: AssociateUsersAccessProfileResponse
  ): AccessProfileUsersAssociationResponse {
    const accessProfileResponse = this.toSimpleAccessProfiles(userAccessProfile.accessProfile);
    return {
      ...accessProfileResponse,
      userIds: userAccessProfile.users.map((user) => user.id),
    };
  }

  private toSimpleAccessProfilesWithFeatures(accessProfile: AccessProfile): AccessProfileResponseWithFeatures {
    return {
      id: accessProfile.id,
      name: accessProfile.name,
      admin: accessProfile.admin,
      createdAt: accessProfile.createdAt,
      updatedAt: accessProfile.updatedAt,
      featuresIds: accessProfile.features.map((feature) => feature.id),
    };
  }
}

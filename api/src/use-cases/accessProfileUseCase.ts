import {
  AssociateUsersAccessProfile, AssociateUsersAccessProfileResponse,
  CreateAccessProfile,
  UpdateAccessProfile,
} from "../domain/dtos/accessProfile";
import { NotFoundError, UnprocessableEntityError } from "../domain/dtos/errors";
import { Page, PaginatedFindConditions } from "../domain/dtos/generic";
import { AccessProfile } from "../domain/models/accessProfile";
import { Feature } from "../domain/models/feature";
import { RoutesFeature } from "../domain/models/routesFeature";
import { AccessProfileRepository } from "../domain/ports/accessProfileRepository";
import { FeatureRepository } from "../domain/ports/featureRepository";
import { RoutesFeatureRepository } from "../domain/ports/routesFeatureRepository";
import { UserRepository } from "../domain/ports/userRepository";

export class AccessProfileUseCase {
  constructor(private accessProfileRepository: AccessProfileRepository, private featureRepository: FeatureRepository,
    private routesFeatureRepository: RoutesFeatureRepository, private userRepository: UserRepository) {}

  public async create(createAccessProfileDto: CreateAccessProfile): Promise<AccessProfile> {
    await this.checkIfNameExists(createAccessProfileDto.name);
    const features = await this.featureRepository.findByIds(createAccessProfileDto.featuresIds);

    const accessProfile = new AccessProfile(
      createAccessProfileDto.name,
      createAccessProfileDto.admin,
      features
    );

    return await this.accessProfileRepository.insert(accessProfile);
  }

  public async findAll(query: PaginatedFindConditions<AccessProfile>): Promise<Page<AccessProfile>> {
    return await this.accessProfileRepository.paginatedFindBy(query);
  }

  public async findById(id: number): Promise<AccessProfile> {
    const accessProfile = await this.checkIfAccessProfileExists(id);

    return accessProfile;
  }

  public async update(id: number, updateAccessProfile: UpdateAccessProfile): Promise<AccessProfile> {
    const accessProfile = await this.checkIfAccessProfileExists(id);
    await this.checkIfNameExists(updateAccessProfile.name, id);

    const features = await this.featureRepository.findByIds(updateAccessProfile.featuresIds);

    accessProfile.name = updateAccessProfile.name;
    accessProfile.admin = updateAccessProfile.admin;
    accessProfile.features = features;
    accessProfile.updatedAt = new Date();

    return await this.accessProfileRepository.update(accessProfile);
  }

  public async delete(id: number): Promise<void> {
    const accessProfile = await this.checkIfAccessProfileExists(id);

    return await this.accessProfileRepository.delete(accessProfile);
  }

  public async associateUsers(id: number,
    associateUsersAccessProfile: AssociateUsersAccessProfile): Promise<AssociateUsersAccessProfileResponse> {
    const accessProfile = await this.checkIfAccessProfileExists(id);

    const users = await this.userRepository.findByIds(associateUsersAccessProfile.userIds);
    users.forEach((user) => {
      user.accessProfiles = [...user.accessProfiles, accessProfile];
    });
    await this.userRepository.updateMany(users);

    return { accessProfile, users };
  }

  public async findAllRoutesFeature(query: PaginatedFindConditions<RoutesFeature>): Promise<Page<RoutesFeature>> {
    return await this.routesFeatureRepository.paginatedFindBy(query);
  }

  public async findAllFeature(query: PaginatedFindConditions<Feature>): Promise<Page<Feature>> {
    return await this.featureRepository.paginatedFindBy(query);
  }

  private async checkIfAccessProfileExists(id: number): Promise<AccessProfile> {
    const accessProfile = await this.accessProfileRepository.findOne(id);

    if (!accessProfile) {
      throw new NotFoundError("Perfil de acesso não encontrado");
    }

    return accessProfile;
  }

  private async checkIfNameExists(name: string, id?: number): Promise<void> {
    const accessProfileNameExists = await this.accessProfileRepository.findOneBy({ name });

    if (accessProfileNameExists && accessProfileNameExists.id !== id) {
      throw new UnprocessableEntityError("Já existe um perfil de acesso com esse nome");
    }
  }
}

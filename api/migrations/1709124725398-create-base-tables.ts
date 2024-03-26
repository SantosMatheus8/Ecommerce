import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createBaseTables1709124725398 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phone_number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'confirmed_at',
            isNullable: true,
            type: 'timestamp',
          },
          {
            name: 'deleted_at',
            isNullable: true,
            type: 'timestamp',
          },
          {
            name: 'created_at',
            isNullable: false,
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            isNullable: false,
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'access_profiles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'admin',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'created_at',
            isNullable: false,
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            isNullable: false,
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'user_access_profiles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'access_profile_id',
            type: 'int',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_user_access_profiles_user',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_user_access_profiles_access_profile',
            columnNames: ['access_profile_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'access_profiles',
            onDelete: 'CASCADE',
          },
        ],
        uniques: [
          {
            name: 'UQ_user_access_profiles',
            columnNames: ['user_id', 'access_profile_id'],
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'features',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'active',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'is_admin',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'created_at',
            isNullable: false,
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            isNullable: false,
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'access_profiles_features',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'feature_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'access_profile_id',
            type: 'int',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_feature_access_profiles_feature',
            columnNames: ['feature_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'features',
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_feature_access_profiles_access_profile',
            columnNames: ['access_profile_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'access_profiles',
            onDelete: 'CASCADE',
          },
        ],
        uniques: [
          {
            name: 'UQ_feature_access_profiles',
            columnNames: ['feature_id', 'access_profile_id'],
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'routes',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'uri',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'verb',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'is_public',
            type: 'boolean',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'routes_features',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'feature_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'route_id',
            type: 'int',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_feature_routes_feature',
            columnNames: ['feature_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'features',
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_feature_routes_route',
            columnNames: ['route_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'routes',
            onDelete: 'CASCADE',
          },
        ],
        uniques: [
          {
            name: 'UQ_feature_routes',
            columnNames: ['feature_id', 'route_id'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_access_profiles');
    await queryRunner.dropTable('users');
    await queryRunner.dropTable('access_profiles_features');
    await queryRunner.dropTable('access_profiles');
    await queryRunner.dropTable('routes_features');
    await queryRunner.dropTable('features');
    await queryRunner.dropTable('routes');
  }
}

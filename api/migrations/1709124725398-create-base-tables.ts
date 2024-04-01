import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createBaseTables1709124725398 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
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
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'quantity',
            type: 'int',
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
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'totalValue',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'uuid',
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

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey( {
          columnNames: ['user_id'], 
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE', 
      }),
  );

  await queryRunner.createTable(
    new Table({
      name: "orders_products",
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isNullable: false,
          isGenerated: true,
        },
        {
          name: "product_id",
          type: "uuid",
          isNullable: false,
        },
        {
          name: "order_id",
          type: "uuid",
          isNullable: false,
        },
      ],
      foreignKeys: [
        {
          name: "FK_product_orders_product",
          columnNames: ["product_id"],
          referencedColumnNames: ["id"],
          referencedTableName: "products",
          onDelete: "CASCADE",
        },
        {
          name: "FK_product_orders_order",
          columnNames: ["order_id"],
          referencedColumnNames: ["id"],
          referencedTableName: "orders",
          onDelete: "CASCADE",
        },
      ],
      // uniques: [
      //   {
      //     name: "UQ_product_orders",
      //     columnNames: ["product_id", "order_id"],
      //   },
      // ],
    }),
    true
  );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_orders');
    await queryRunner.dropTable('users');
    await queryRunner.dropTable('orders_products');
    await queryRunner.dropTable('orders');
    await queryRunner.dropTable('routes_products');
    await queryRunner.dropTable('products');
    await queryRunner.dropTable('routes');
  }
}

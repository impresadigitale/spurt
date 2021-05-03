import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateDeliveryStatusTable1577193139306 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
                const table = new Table({
            name: 'delivery_status',
            columns: [
                {
                    name: 'delivery_status_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'name',
                    type: 'varchar',
                    length: '32',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'color_code',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'is_active',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'modified_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'modified_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'priority',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('delivery_status');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
    }
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('delivery_status', true);
    }
}

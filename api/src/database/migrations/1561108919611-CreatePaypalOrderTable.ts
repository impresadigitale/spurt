import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreatePaypalOrderTable1561108919611 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'paypal_order',
            columns: [
                {
                    name: 'paypal_order_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'order_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'date_added',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'date_modified',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'capture_status',
                    type: 'enum',
                    enum: ['completed', 'notcomplete'],
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'currency_code',
                    type: 'char',
                    length: '3',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'authorization_id',
                    type: 'varchar',
                    length: '30',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'total',
                    type: 'decimal(10,2)',
                    isPrimary: false,
                    isNullable: false,
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('paypal_order');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('paypal_order', true);
    }
}

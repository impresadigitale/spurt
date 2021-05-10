import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateDeliveryAllocationTable1577168888697 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_vendor_order_tbl_delivery_allocation_foreignKey',
        columnNames: ['vendor_order_id'],
        referencedColumnNames: ['vendor_order_id'],
        referencedTableName: 'vendor_orders',
        onDelete: 'CASCADE',
    });

    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_tbl_order_tbl_delivery_allocation_foreignKey',
        columnNames: ['order_id'],
        referencedColumnNames: ['order_id'],
        referencedTableName: 'order',
        onDelete: 'CASCADE',
    });

    private tableForeignKey2 = new TableForeignKey({
        name: 'fk_tbl_delivery_person_tbl_delivery_allocation_foreignKey',
        columnNames: ['delivery_person_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'delivery_person',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'delivery_allocation',
            columns: [
                {
                    name: 'delivery_allocation_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'vendor_order_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'order_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'delivery_person_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'delivery_order_status_id',
                    type: 'integer',
                    length: '11',
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
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('delivery_allocation');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }

        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }

        const ifDataExist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_id') !== -1);
        if (!ifDataExist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey1);
        }

        const ifDataExistt = table.foreignKeys.find(fk => fk.columnNames.indexOf('delivery_person_id') !== -1);
        if (!ifDataExistt) {
            await queryRunner.createForeignKey(table, this.tableForeignKey2);
        }
    }
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('delivery_allocation', true);
    }

}

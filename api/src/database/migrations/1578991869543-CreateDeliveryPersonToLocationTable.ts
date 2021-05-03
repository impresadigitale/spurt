import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateDeliveryPersonToLocationTable1578991869543 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_deliveryPersonToLocation_tbl_deliveryPerson_foreignKey',
            columnNames: ['delivery_person_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'delivery_person',
            onDelete: 'CASCADE',
    });

    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_tbl_deliveryPersonToLocation_tbl_deliveryLocation_foreignKey',
        columnNames: ['delivery_location_id'],
        referencedColumnNames: ['delivery_location_id'],
        referencedTableName: 'delivery_location',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'delivery_person_to_location',
            columns: [
                {
                    name: 'delivery_person_to_location_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'delivery_person_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'delivery_location_id',
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
        const ifExsist = await queryRunner.hasTable('delivery_person_to_location');
        if (!ifExsist) {
            await queryRunner.createTable(table);

        }

        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('delivery_person_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }

        const ifDataExist = table.foreignKeys.find(fk => fk.columnNames.indexOf('delivery_location_id') !== -1);
        if (!ifDataExist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey1);
        }
    }
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('delivery_person_to_location', true);
    }

}

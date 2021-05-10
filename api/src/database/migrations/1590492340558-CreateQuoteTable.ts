import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateQuoteTable1590492340558 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_product_tbl_quotation_foreign',
        columnNames: ['product_id'],
        referencedColumnNames: ['product_id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
    });
    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_tbl_customer_tbl_quotation_foreign',
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customer',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'quotation',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'product_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'customer_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'quantity',
                    type: 'integer',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'quantity_unit',
                    type: 'varchar',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'order_value',
                    type: 'varchar',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'comments',
                    type: 'text',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'purpose',
                    type: 'integer',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                }, {
                    name: 'modified_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'modified_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('quotation');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
        const ifDataExsist1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('customer_id') !== -1);
        if (!ifDataExsist1) {
            await queryRunner.createForeignKey(table, this.tableForeignKey1);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('quotation', true);
    }

}

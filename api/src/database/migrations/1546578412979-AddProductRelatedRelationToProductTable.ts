import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class AddProductRelatedRelationToProductTable1546578412979 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_product_related_product1',
        columnNames: ['product_id'],
        referencedColumnNames: ['product_id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('product_related');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }
    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('product_related');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKey);
        }
    }

}

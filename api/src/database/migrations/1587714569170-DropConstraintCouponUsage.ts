import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class DropConstraintCouponUsage1587714569170 implements MigrationInterface {
    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_tbl_coupon_usage_tbl_vendor_coupon_foreignKey',
        columnNames: ['coupon_id'],
        referencedColumnNames: ['vendor_coupon_id'],
        referencedTableName: 'vendor_coupon',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('coupon_usage');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('coupon_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKey1);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('coupon_usage');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('coupon_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKey1);
        }
    }

}

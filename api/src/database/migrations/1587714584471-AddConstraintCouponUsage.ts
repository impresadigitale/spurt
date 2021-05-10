import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class AddConstraintCouponUsage1587714584471 implements MigrationInterface {
    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_tbl_coupon_usage_tbl_coupon_foreignKey',
        columnNames: ['coupon_id'],
        referencedColumnNames: ['vendor_coupon_id'],
        referencedTableName: 'coupon',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('coupon_usage');
        const ifDataExsist1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('coupon_id') !== -1);
        if (!ifDataExsist1) {
            await queryRunner.createForeignKey(table, this.tableForeignKey1);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('coupon_usage');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('coupon_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey1);
        }
    }

}

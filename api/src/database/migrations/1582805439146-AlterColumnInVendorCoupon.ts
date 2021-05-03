import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AlterColumnInVendorCoupon1582805439146 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExistt = await queryRunner.hasColumn('vendor_coupon', 'start_date');
        if (!ifExistt) {
            await queryRunner.addColumn('vendor_coupon', new TableColumn({
                name: 'start_date',
                type: 'date',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const ifExist = await queryRunner.hasColumn('vendor_coupon', 'end_date');
        if (!ifExist) {
            await queryRunner.addColumn('vendor_coupon', new TableColumn({
                name: 'end_date',
                type: 'date',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('vendor_coupon', 'start_date');
        await queryRunner.dropColumn('vendor_coupon', 'end_date');
    }

}

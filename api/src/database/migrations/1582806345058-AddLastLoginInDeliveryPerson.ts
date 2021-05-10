import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddLastLoginInDeliveryPerson1582806345058 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExistt = await queryRunner.hasColumn('delivery_person', 'last_login');
        if (!ifExistt) {
            await queryRunner.addColumn('delivery_person', new TableColumn({
                name: 'last_login',
                type: 'datetime',
                isPrimary: false,
                isNullable: true,
            }));
        }

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('delivery_person', 'last_login');
    }

}

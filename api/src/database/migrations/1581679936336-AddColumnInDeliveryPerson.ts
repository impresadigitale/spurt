import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInDeliveryPerson1581679936336 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('delivery_person', 'all_location');
        if (!ifExist) {
            await queryRunner.addColumn('delivery_person', new TableColumn({
                name: 'all_location',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 0,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('delivery_person', 'all_location');
    }

}

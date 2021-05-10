import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInAnswerTable1585563990633 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('product_answer', 'default_answer');
        if (!ifExist) {
        await queryRunner.addColumn('product_answer', new TableColumn({
                name: 'default_answer',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 0,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('product_answer', 'default_answer');
    }

}

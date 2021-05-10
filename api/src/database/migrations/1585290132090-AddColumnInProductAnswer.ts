import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInProductAnswer1585290132090 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('product_answer', 'likes');
        if (!ifExist) {
        await queryRunner.addColumn('product_answer', new TableColumn({
                name: 'likes',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 0,
                }));
        }

        const ifExistt = await queryRunner.hasColumn('product_answer', 'dislikes');
        if (!ifExistt) {
        await queryRunner.addColumn('product_answer', new TableColumn({
                name: 'dislikes',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 0,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('product_answer', 'likes');
        await queryRunner.dropColumn('product_answer', 'unlikes');
    }

}

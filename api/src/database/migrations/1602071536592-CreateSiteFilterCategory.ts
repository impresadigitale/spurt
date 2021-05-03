import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateSiteFilterCategory1602071536592 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_filter_Related_tbl_site_filter_category',
        columnNames: ['site_filter_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'site_filter',
        onDelete: 'CASCADE',
    });
    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_tbl_category_Related_tbl_site_filter_category',
        columnNames: ['category_id'],
        referencedColumnNames: ['category_id'],
        referencedTableName: 'category',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'site_filter_category',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'category_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'site_filter_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('site_filter_category');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('site_filter_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
        const ifDataExsist1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('category_id') !== -1);
        if (!ifDataExsist1) {
            await queryRunner.createForeignKey(table, this.tableForeignKey1);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('site_filter_category', true);
    }

}

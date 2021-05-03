import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateSiteFilterSectionItem1602071583209 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_filter_section_Related_tbl_filter_section_item',
        columnNames: ['site_filter_section_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'site_filter_section',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'site_filter_section_item',
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
                    name: 'site_filter_section_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'item_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'item_slug',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('site_filter_section_item');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('site_filter_section_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('site_filter_section_item', true);
    }

}

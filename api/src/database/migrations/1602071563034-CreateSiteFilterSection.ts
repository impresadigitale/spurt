import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateSiteFilterSection1602071563034 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_site_filter_Related_tbl_site_filter_section',
        columnNames: ['site_filter_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'site_filter',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'site_filter_section',
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
                    name: 'site_filter_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'section_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'section_slug',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'section_type',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    comment : '1-> varient 2-> attribute',
                }, {
                    name: 'sequence',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('site_filter_section');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('site_filter_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('site_filter_section', true);
    }

}

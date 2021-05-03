import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateAttributeTable1601357631903 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_attribute_group_Related_tbl_attribute',
        columnNames: ['group_id'],
        referencedColumnNames: ['group_id'],
        referencedTableName: 'attribute_group',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'attribute',
            columns: [
                {
                    name: 'attribute_id',
                    type: 'int',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'attribute_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'sort_order',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'group_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },  {
                    name: 'created_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                }, {
                    name: 'modified_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                }, {
                    name: 'created_by',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'modified_by',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('attribute');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }

        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('group_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('attribute', true);
    }

}

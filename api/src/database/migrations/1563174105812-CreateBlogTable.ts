import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateBlogTable1563174105812 implements MigrationInterface {
    private tableForeignKeys = new TableForeignKey({
        name: 'fk_blog_category',
        columnNames: ['category_id'],
        referencedColumnNames: ['category_id'],
        referencedTableName: 'category',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',

    });
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'blog',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    length: '11',
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isPrimary: true,
                    isNullable: false,
                },  {
                    name: 'title',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'category_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'description',
                    type: 'TEXT',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'image',
                    type: 'TEXT',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'image_path',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'is_active',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'meta_tag_title',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'meta_tag_description',
                    type: 'TEXT',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'meta_tag_keyword',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'blog_slug',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'modified_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default:  'CURRENT_TIMESTAMP',
                }, {
                    name: 'modified_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default:  'CURRENT_TIMESTAMP',
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('blog');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const ifTable = await queryRunner.getTable('blog');
        const ifDataExsist = ifTable.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(ifTable, this.tableForeignKeys);
        }
    }
    public async down(queryRunner: QueryRunner): Promise<any> {
        const ifTable = await queryRunner.getTable('blog');
        await queryRunner.dropTable('blog', true);
        if (ifTable) {
            await queryRunner.dropForeignKey(ifTable, this.tableForeignKeys);
        }
    }
}

import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class AddContraintInBlogRelated1586945695954 implements MigrationInterface {
    private RelatedBlogToBlogForeignKeys = new TableForeignKey({
        name: 'fk_tbl_related_blog_id_tbl_blog',
        columnNames: ['related_blog_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'blog',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('blog_related');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('related_blog_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.RelatedBlogToBlogForeignKeys);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('blog_related');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('related_blog_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.RelatedBlogToBlogForeignKeys);
        }
    }

}

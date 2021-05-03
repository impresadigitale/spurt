import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateReportAbuseTable1587374782552 implements MigrationInterface {
    private questionForeignKeys = new TableForeignKey({
        name: 'fk_tbl_question_tbl_report_abuse',
        columnNames: ['question_id'],
        referencedColumnNames: ['question_id'],
        referencedTableName: 'product_question',
        onDelete: 'CASCADE',
    });
    private answerForeignKeys = new TableForeignKey({
        name: 'fk_tbl_answer_tbl_report_abuse',
        columnNames: ['answer_id'],
        referencedColumnNames: ['answer_id'],
        referencedTableName: 'product_answer',
        onDelete: 'CASCADE',
    });
    private customerForeignKeys = new TableForeignKey({
        name: 'fk_tbl_customer_tbl_report_abuse',
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customer',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'answer_report_abuse',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'customer_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'question_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'answer_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'reason_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'remark',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'is_active',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                }, {
                    name: 'modified_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'modified_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('answer_report_abuse');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('question_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.questionForeignKeys);
        }

        const ifDataExsist1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('answer_id') !== -1);
        if (!ifDataExsist1) {
            await queryRunner.createForeignKey(table, this.answerForeignKeys);
        }

        const ifDataExsist2 = table.foreignKeys.find(fk => fk.columnNames.indexOf('customer_id') !== -1);
        if (!ifDataExsist2) {
            await queryRunner.createForeignKey(table, this.customerForeignKeys);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('answer_report_abuse', true);
    }

}

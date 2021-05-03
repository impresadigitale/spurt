import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreatePaypalOrderTransactionTable1561109413675 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'paypal_order_transaction',
            columns: [
                {
                    name: 'paypal_order_transaction_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'paypal_order_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'transaction_id',
                    type: 'char',
                    length: '20',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'parent_id',
                    type: 'char',
                    length: '20',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'date_added',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'note',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'msgsubid',
                    type: 'char',
                    length: '38',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'receipt_id',
                    type: 'char',
                    length: '20',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'payment_type',
                    type: 'enum',
                    enum: ['none', 'echeck', 'instant', 'refund', 'void'],
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'payment_status',
                    type: 'char',
                    length: '20',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'pending_reason',
                    type: 'char',
                    length: '50',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'transaction_entity',
                    type: 'char',
                    length: '50',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'amount',
                    type: 'decimal(10,2)',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'debug_data',
                    type: 'text',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'call_data',
                    type: 'text',
                    isPrimary: false,
                    isNullable: false,
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('paypal_order_transaction');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('paypal_order_transaction', true);
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaypalOrderTransactionTable1561109413675 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreatePaypalOrderTransactionTable1561109413675 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
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
            const ifExsist = yield queryRunner.hasTable('paypal_order_transaction');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('paypal_order_transaction', true);
        });
    }
}
exports.CreatePaypalOrderTransactionTable1561109413675 = CreatePaypalOrderTransactionTable1561109413675;
//# sourceMappingURL=1561109413675-CreatePaypalOrderTransactionTable.js.map
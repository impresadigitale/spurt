"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaypalOrderTable1561108919611 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreatePaypalOrderTable1561108919611 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'paypal_order',
                columns: [
                    {
                        name: 'paypal_order_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'order_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'date_added',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'date_modified',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'capture_status',
                        type: 'enum',
                        enum: ['completed', 'notcomplete'],
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'currency_code',
                        type: 'char',
                        length: '3',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'authorization_id',
                        type: 'varchar',
                        length: '30',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'total',
                        type: 'decimal(10,2)',
                        isPrimary: false,
                        isNullable: false,
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('paypal_order');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('paypal_order', true);
        });
    }
}
exports.CreatePaypalOrderTable1561108919611 = CreatePaypalOrderTable1561108919611;
//# sourceMappingURL=1561108919611-CreatePaypalOrderTable.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderLogTable1549968165253 = void 0;
const tslib_1 = require("tslib");
const index_1 = require("typeorm/index");
class CreateOrderLogTable1549968165253 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new index_1.Table({
                name: 'order_log',
                columns: [
                    {
                        name: 'order_log_id',
                        type: 'int',
                        length: '11',
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isPrimary: true,
                        isNullable: false,
                    }, {
                        name: 'customer_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'currency_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'shipping_zone_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'payment_zone_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'shipping_country_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'payment_country_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'invoice_no',
                        type: 'varchar',
                        length: '45',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'invoice_prefix',
                        type: 'varchar',
                        length: '26',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'firstname',
                        type: 'varchar',
                        length: '32',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'lastname',
                        type: 'varchar',
                        length: '32',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'email',
                        type: 'varchar',
                        length: '96',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'telephone',
                        type: 'varchar',
                        length: '32',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'fax',
                        type: 'varchar',
                        length: '32',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'shipping_firstname',
                        type: 'varchar',
                        length: '32',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'shipping_lastname',
                        type: 'varchar',
                        length: '32',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'shipping_company',
                        type: 'varchar',
                        length: '32',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'shipping_address_1',
                        type: 'varchar',
                        length: '128',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'shipping_address_2',
                        type: 'varchar',
                        length: '128',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'shipping_city',
                        type: 'varchar',
                        length: '128',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'shipping_postcode',
                        type: 'varchar',
                        length: '10',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'shipping_country',
                        type: 'varchar',
                        length: '128',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'shipping_zone',
                        type: 'varchar',
                        length: '128',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'shipping_address_format',
                        type: 'TEXT',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'shipping_method',
                        type: 'varchar',
                        length: '128',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'payment_firstname',
                        type: 'varchar',
                        length: '32',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'payment_lastname',
                        type: 'varchar',
                        length: '32',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'payment_company',
                        type: 'varchar',
                        length: '32',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'payment_address_1',
                        type: 'varchar',
                        length: '128',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'payment_address_2',
                        type: 'varchar',
                        length: '128',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'payment_city',
                        type: 'varchar',
                        length: '128',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'payment_postcode',
                        type: 'varchar',
                        length: '10',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'payment_country',
                        type: 'varchar',
                        length: '128',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'payment_zone',
                        type: 'varchar',
                        length: '128',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'payment_address_format',
                        type: 'TEXT',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'payment_method',
                        type: 'varchar',
                        length: '128',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'comment',
                        type: 'TEXT',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'total',
                        type: 'DECIMAL',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'reward',
                        type: 'integer',
                        length: '8',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'order_status_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'affiliate_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'commision',
                        type: 'DECIMAL',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'currency_code',
                        type: 'varchar',
                        length: '3',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'currency_value',
                        type: 'DECIMAL',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'ip',
                        type: 'varchar',
                        length: '15',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'payment_flag',
                        type: 'integer',
                        length: '3',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'order_name',
                        type: 'varchar',
                        length: '32',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'is_active',
                        type: 'int',
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
                        default: 'CURRENT_TIMESTAMP',
                    }, {
                        name: 'modified_date',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('order_log');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('order_log', true);
        });
    }
}
exports.CreateOrderLogTable1549968165253 = CreateOrderLogTable1549968165253;
//# sourceMappingURL=1549968165253-CreateOrderLogTable.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCouponUsageTable1582717005161 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateCouponUsageTable1582717005161 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_coupon_usage_tbl_order_foreignKey',
            columnNames: ['order_id'],
            referencedColumnNames: ['order_id'],
            referencedTableName: 'order',
            onDelete: 'CASCADE',
        });
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_coupon_usage_tbl_vendor_coupon_foreignKey',
            columnNames: ['coupon_id'],
            referencedColumnNames: ['vendor_coupon_id'],
            referencedTableName: 'vendor_coupon',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'coupon_usage',
                columns: [
                    {
                        name: 'coupon_usage_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'coupon_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'customer_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'order_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'discount_amount',
                        type: 'decimal',
                        length: '10,2',
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
            const ifExsist = yield queryRunner.hasTable('coupon_usage');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
            const ifDataExsistt = table.foreignKeys.find(fk => fk.columnNames.indexOf('coupon_id') !== -1);
            if (!ifDataExsistt) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey1);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('coupon_usage', true);
        });
    }
}
exports.CreateCouponUsageTable1582717005161 = CreateCouponUsageTable1582717005161;
//# sourceMappingURL=1582717005161-CreateCouponUsageTable.js.map
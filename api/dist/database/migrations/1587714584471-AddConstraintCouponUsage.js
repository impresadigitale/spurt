"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddConstraintCouponUsage1587714584471 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddConstraintCouponUsage1587714584471 {
    constructor() {
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_coupon_usage_tbl_coupon_foreignKey',
            columnNames: ['coupon_id'],
            referencedColumnNames: ['vendor_coupon_id'],
            referencedTableName: 'coupon',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('coupon_usage');
            const ifDataExsist1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('coupon_id') !== -1);
            if (!ifDataExsist1) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey1);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('coupon_usage');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('coupon_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey1);
            }
        });
    }
}
exports.AddConstraintCouponUsage1587714584471 = AddConstraintCouponUsage1587714584471;
//# sourceMappingURL=1587714584471-AddConstraintCouponUsage.js.map
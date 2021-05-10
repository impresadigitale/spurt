"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropConstraintCouponUsage1587714569170 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class DropConstraintCouponUsage1587714569170 {
    constructor() {
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
            const table = yield queryRunner.getTable('coupon_usage');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('coupon_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKey1);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('coupon_usage');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('coupon_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKey1);
            }
        });
    }
}
exports.DropConstraintCouponUsage1587714569170 = DropConstraintCouponUsage1587714569170;
//# sourceMappingURL=1587714569170-DropConstraintCouponUsage.js.map
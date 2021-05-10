"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnInVendorCoupon1582805439146 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AlterColumnInVendorCoupon1582805439146 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExistt = yield queryRunner.hasColumn('vendor_coupon', 'start_date');
            if (!ifExistt) {
                yield queryRunner.addColumn('vendor_coupon', new typeorm_1.TableColumn({
                    name: 'start_date',
                    type: 'date',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist = yield queryRunner.hasColumn('vendor_coupon', 'end_date');
            if (!ifExist) {
                yield queryRunner.addColumn('vendor_coupon', new typeorm_1.TableColumn({
                    name: 'end_date',
                    type: 'date',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('vendor_coupon', 'start_date');
            yield queryRunner.dropColumn('vendor_coupon', 'end_date');
        });
    }
}
exports.AlterColumnInVendorCoupon1582805439146 = AlterColumnInVendorCoupon1582805439146;
//# sourceMappingURL=1582805439146-AlterColumnInVendorCoupon.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddLastLoginInDeliveryPerson1582806345058 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddLastLoginInDeliveryPerson1582806345058 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExistt = yield queryRunner.hasColumn('delivery_person', 'last_login');
            if (!ifExistt) {
                yield queryRunner.addColumn('delivery_person', new typeorm_1.TableColumn({
                    name: 'last_login',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('delivery_person', 'last_login');
        });
    }
}
exports.AddLastLoginInDeliveryPerson1582806345058 = AddLastLoginInDeliveryPerson1582806345058;
//# sourceMappingURL=1582806345058-AddLastLoginInDeliveryPerson.js.map
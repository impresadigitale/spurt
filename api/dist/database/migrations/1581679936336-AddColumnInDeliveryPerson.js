"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInDeliveryPerson1581679936336 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInDeliveryPerson1581679936336 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('delivery_person', 'all_location');
            if (!ifExist) {
                yield queryRunner.addColumn('delivery_person', new typeorm_1.TableColumn({
                    name: 'all_location',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    default: 0,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('delivery_person', 'all_location');
        });
    }
}
exports.AddColumnInDeliveryPerson1581679936336 = AddColumnInDeliveryPerson1581679936336;
//# sourceMappingURL=1581679936336-AddColumnInDeliveryPerson.js.map
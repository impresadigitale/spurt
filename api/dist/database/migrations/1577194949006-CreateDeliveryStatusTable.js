"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDeliveryStatusTable1577193139306 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateDeliveryStatusTable1577193139306 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'delivery_status',
                columns: [
                    {
                        name: 'delivery_status_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'name',
                        type: 'varchar',
                        length: '32',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'color_code',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'is_active',
                        type: 'integer',
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
                    }, {
                        name: 'modified_date',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'priority',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('delivery_status');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('delivery_status', true);
        });
    }
}
exports.CreateDeliveryStatusTable1577193139306 = CreateDeliveryStatusTable1577193139306;
//# sourceMappingURL=1577194949006-CreateDeliveryStatusTable.js.map
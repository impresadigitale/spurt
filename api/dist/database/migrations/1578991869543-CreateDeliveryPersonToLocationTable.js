"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDeliveryPersonToLocationTable1578991869543 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateDeliveryPersonToLocationTable1578991869543 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_deliveryPersonToLocation_tbl_deliveryPerson_foreignKey',
            columnNames: ['delivery_person_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'delivery_person',
            onDelete: 'CASCADE',
        });
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_deliveryPersonToLocation_tbl_deliveryLocation_foreignKey',
            columnNames: ['delivery_location_id'],
            referencedColumnNames: ['delivery_location_id'],
            referencedTableName: 'delivery_location',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'delivery_person_to_location',
                columns: [
                    {
                        name: 'delivery_person_to_location_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'delivery_person_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'delivery_location_id',
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
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('delivery_person_to_location');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('delivery_person_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
            const ifDataExist = table.foreignKeys.find(fk => fk.columnNames.indexOf('delivery_location_id') !== -1);
            if (!ifDataExist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey1);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('delivery_person_to_location', true);
        });
    }
}
exports.CreateDeliveryPersonToLocationTable1578991869543 = CreateDeliveryPersonToLocationTable1578991869543;
//# sourceMappingURL=1578991869543-CreateDeliveryPersonToLocationTable.js.map
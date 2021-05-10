"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDeliveryAllocationTable1577168888697 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateDeliveryAllocationTable1577168888697 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_vendor_order_tbl_delivery_allocation_foreignKey',
            columnNames: ['vendor_order_id'],
            referencedColumnNames: ['vendor_order_id'],
            referencedTableName: 'vendor_orders',
            onDelete: 'CASCADE',
        });
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_order_tbl_delivery_allocation_foreignKey',
            columnNames: ['order_id'],
            referencedColumnNames: ['order_id'],
            referencedTableName: 'order',
            onDelete: 'CASCADE',
        });
        this.tableForeignKey2 = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_delivery_person_tbl_delivery_allocation_foreignKey',
            columnNames: ['delivery_person_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'delivery_person',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'delivery_allocation',
                columns: [
                    {
                        name: 'delivery_allocation_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'vendor_order_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'order_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'delivery_person_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'delivery_order_status_id',
                        type: 'integer',
                        length: '11',
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
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('delivery_allocation');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
            const ifDataExist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_id') !== -1);
            if (!ifDataExist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey1);
            }
            const ifDataExistt = table.foreignKeys.find(fk => fk.columnNames.indexOf('delivery_person_id') !== -1);
            if (!ifDataExistt) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey2);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('delivery_allocation', true);
        });
    }
}
exports.CreateDeliveryAllocationTable1577168888697 = CreateDeliveryAllocationTable1577168888697;
//# sourceMappingURL=1577168888697-CreateDeliveryAllocationTable.js.map
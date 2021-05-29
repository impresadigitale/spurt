"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSiteFilterCategory1602071536592 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateSiteFilterCategory1602071536592 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_filter_Related_tbl_site_filter_category',
            columnNames: ['site_filter_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'site_filter',
            onDelete: 'CASCADE',
        });
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_category_Related_tbl_site_filter_category',
            columnNames: ['category_id'],
            referencedColumnNames: ['category_id'],
            referencedTableName: 'category',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'site_filter_category',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'category_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'site_filter_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('site_filter_category');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('site_filter_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
            const ifDataExsist1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('category_id') !== -1);
            if (!ifDataExsist1) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey1);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('site_filter_category', true);
        });
    }
}
exports.CreateSiteFilterCategory1602071536592 = CreateSiteFilterCategory1602071536592;
//# sourceMappingURL=1602071536592-CreateSiteFilterCategory.js.map
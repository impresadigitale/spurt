"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSiteFilterSectionItem1602071583209 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateSiteFilterSectionItem1602071583209 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_filter_section_Related_tbl_filter_section_item',
            columnNames: ['site_filter_section_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'site_filter_section',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'site_filter_section_item',
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
                        name: 'site_filter_section_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'item_name',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'item_slug',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('site_filter_section_item');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('site_filter_section_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('site_filter_section_item', true);
        });
    }
}
exports.CreateSiteFilterSectionItem1602071583209 = CreateSiteFilterSectionItem1602071583209;
//# sourceMappingURL=1602071583209-CreateSiteFilterSectionItem.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSiteFilterSection1602071563034 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateSiteFilterSection1602071563034 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_site_filter_Related_tbl_site_filter_section',
            columnNames: ['site_filter_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'site_filter',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'site_filter_section',
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
                        name: 'site_filter_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'section_name',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'section_slug',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'section_type',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                        comment: '1-> varient 2-> attribute',
                    }, {
                        name: 'sequence',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('site_filter_section');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('site_filter_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('site_filter_section', true);
        });
    }
}
exports.CreateSiteFilterSection1602071563034 = CreateSiteFilterSection1602071563034;
//# sourceMappingURL=1602071563034-CreateSiteFilterSection.js.map
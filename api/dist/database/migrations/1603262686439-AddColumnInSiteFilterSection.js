"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInSiteFilterSection1603262686439 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInSiteFilterSection1603262686439 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('site_filter_section', 'section_id');
            if (!ifExist) {
                yield queryRunner.addColumn('site_filter_section', new typeorm_1.TableColumn({
                    name: 'section_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('site_filter_section', 'section_id');
        });
    }
}
exports.AddColumnInSiteFilterSection1603262686439 = AddColumnInSiteFilterSection1603262686439;
//# sourceMappingURL=1603262686439-AddColumnInSiteFilterSection.js.map
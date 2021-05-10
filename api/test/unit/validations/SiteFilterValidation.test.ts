import { SiteFilter } from '../../../src/api/models/SiteFilter';
import { validate } from 'class-validator';

describe('SiteFilterValidations', () => {

    test('SiteFilter should succeed with all required field', async (done) => {
        // ---
        const site = new SiteFilter();
        site.id = 1;
        site.filterName = 'demo';
        const errors = await validate(site);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate SiteFilter without valid id', async (done) => {
        // ---
        const site = new SiteFilter();
        site.filterName = 'demo';
        const errors = await validate(site);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate SiteFilter without valid filterName', async (done) => {
        // ---
        const site = new SiteFilter();
        site.id = 1;
        site.filterName = '';
        const errors = await validate(site);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

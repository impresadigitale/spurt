import { SiteFilterSectionItem } from '../../../src/api/models/SiteFilterSectionItem';
import { validate } from 'class-validator';

describe('SiteFilterSectionItemValidations', () => {

    test('SiteFilterSectionItem should succeed with all required field', async (done) => {
        // ---
        const site = new SiteFilterSectionItem();
        site.id = 1;
        site.filterSectionId = 1;
        site.itemName = 'demo';
        const errors = await validate(site);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate SiteFilterSectionItem without valid id', async (done) => {
        // ---
        const site = new SiteFilterSectionItem();
        site.filterSectionId = 1;
        site.itemName = 'demo';
        const errors = await validate(site);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate SiteFilterSectionItem without valid filterSectionId', async (done) => {
        // ---
        const site = new SiteFilterSectionItem();
        site.id = 1;
        site.itemName = 'demo';
        const errors = await validate(site);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate SiteFilterSectionItem without valid itemName', async (done) => {
        // ---
        const site = new SiteFilterSectionItem();
        site.id = 1;
        site.filterSectionId = 1;
        site.itemName = '';
        const errors = await validate(site);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

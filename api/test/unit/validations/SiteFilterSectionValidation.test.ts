import { SiteFilterSection } from '../../../src/api/models/SiteFilterSection';
import { validate } from 'class-validator';

describe('SiteFilterSectionValidations', () => {

    test('SiteFilterSection should succeed with all required field', async (done) => {
        // ---
        const site = new SiteFilterSection();
        site.id = 1;
        site.filterId = 1;
        site.sectionId = 1;
        site.sectionName = 'demo';
        site.sectionType = 1;
        const errors = await validate(site);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate SiteFilterSection without valid id', async (done) => {
        // ---
        const site = new SiteFilterSection();
        site.filterId = 1;
        site.sectionId = 1;
        site.sectionName = 'demo';
        site.sectionType = 1;
        const errors = await validate(site);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate SiteFilterSection without valid filterId', async (done) => {
        // ---
         const site = new SiteFilterSection();
         site.id = 1;
         site.sectionId = 1;
         site.sectionName = 'demo';
         site.sectionType = 1;
         const errors = await validate(site);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate SiteFilterSection without valid sectionId', async (done) => {
        // ---
         const site = new SiteFilterSection();
         site.id = 1;
         site.filterId = 1;
         site.sectionName = 'demo';
         site.sectionType = 1;
         const errors = await validate(site);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate SiteFilterSection without valid sectionName', async (done) => {
        // ---
         const site = new SiteFilterSection();
         site.id = 1;
         site.filterId = 1;
         site.sectionId = 1;
         site.sectionName = '';
         site.sectionType = 1;
         const errors = await validate(site);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate SiteFilterSection without valid section type', async (done) => {
        // ---
         const site = new SiteFilterSection();
         site.id = 1;
         site.filterId = 1;
         site.sectionId = 1;
         site.sectionName = 'test';
         const errors = await validate(site);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

import { ServiceCategory } from '../../../src/api/models/ServiceCategory';
import { validate } from 'class-validator';

describe('ServiceCategory Validations', () => {

    test('ServiceCategory should succeed with all required field', async (done) => {
        // ---
        const serviceCategory = new ServiceCategory();
        serviceCategory.serviceCategoryId = 1;
        serviceCategory.name = 'Demo';
        const errors = await validate(serviceCategory);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ServiceCategory without valid serviceCategoryId', async (done) => {
        // ---
        const serviceCategory = new ServiceCategory();
        serviceCategory.name = 'Demo';
        const errors = await validate(serviceCategory);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('SShould not validate ServiceCategory without valid name', async (done) => {
        // ---
        const serviceCategory = new ServiceCategory();
        serviceCategory.serviceCategoryId = 1;
        serviceCategory.name = '';
        const errors = await validate(serviceCategory);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});

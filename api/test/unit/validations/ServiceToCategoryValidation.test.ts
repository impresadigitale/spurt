import { ServiceToCategory } from '../../../src/api/models/ServiceToCategory';
import { validate } from 'class-validator';

describe('ServiceToCategory Validations', () => {

    test('ServiceToCategory should succeed with all required field', async (done) => {
        // ---
        const services = new ServiceToCategory();
        services.serviceCategoryId = 1;
        services.serviceId = 1;
        services.serviceToCategoryId = 1;
        const errors = await validate(services);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ServiceToCategory without valid serviceCategoryId', async (done) => {
        // ---
        const services = new ServiceToCategory();
        services.serviceId = 1;
        services.serviceToCategoryId = 1;
        const errors = await validate(services);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ServiceToCategory without valid serviceId', async (done) => {
        // ---
        const services = new ServiceToCategory();
        services.serviceCategoryId = 1;
        services.serviceToCategoryId = 1;
        const errors = await validate(services);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ServiceToCategory without valid serviceToCategoryId', async (done) => {
        // ---
        const services = new ServiceToCategory();
        services.serviceCategoryId = 1;
        services.serviceId = 1;
        const errors = await validate(services);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

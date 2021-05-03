import { ServiceImage } from '../../../src/api/models/ServiceImage';
import { validate } from 'class-validator';

describe('ServiceImage Validations', () => {

    test('ServiceImage should succeed with all required field', async (done) => {
        // ---
        const services = new ServiceImage();
        services.serviceImageId = 1;
        services.serviceId = 1;
        services.isActive = 1;
        const errors = await validate(services);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ServiceImage without valid serviceImageId', async (done) => {
        // ---
        const services = new ServiceImage();
        services.serviceId = 1;
        services.isActive = 1;
        const errors = await validate(services);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ServiceImage without valid serviceId', async (done) => {
        // ---
        const services = new ServiceImage();
        services.serviceImageId = 1;
        services.isActive = 1;
        const errors = await validate(services);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ServiceImage without valid isActive', async (done) => {
        // ---
        const services = new ServiceImage();
        services.serviceImageId = 1;
        services.serviceId = 1;
        const errors = await validate(services);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

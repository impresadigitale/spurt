import { Services } from '../../../src/api/models/Service';
import { validate } from 'class-validator';

describe('ServicesValidations', () => {

    test('Service should succeed with all required field', async (done) => {
        // ---
        const services = new Services();
        services.serviceId = 1;
        services.title = 'Demo';
        services.price = 190;
        const errors = await validate(services);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Service without valid serviceId', async (done) => {
        // ---
        const services = new Services();
        services.title = 'Demo';
        services.price = 190;
        const errors = await validate(services);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Service without valid title', async (done) => {
        // ---
        const services = new Services();
        services.serviceId = 1;
        services.title = '';
        services.price = 190;
        const errors = await validate(services);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Service without valid price', async (done) => {
        // ---
        const services = new Services();
        services.serviceId = 1;
        services.title = 'Demo';
        const errors = await validate(services);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

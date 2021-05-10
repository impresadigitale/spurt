import { ServiceEnquiry } from '../../../src/api/models/ServiceEnquiry';
import { validate } from 'class-validator';

describe('ServiceEnquiry Validations', () => {

    test('ServiceEnquiry should succeed with all required field', async (done) => {
        // ---
        const services = new ServiceEnquiry();
        services.enquiryId = 1;
        services.serviceId = 1;
        services.name = 'Demo';
        services.email = 'picco@gmail.com';
        services.comments = 'Test';
        const errors = await validate(services);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ServiceEnquiry without valid enquiryId', async (done) => {
        // ---
        const services = new ServiceEnquiry();
        services.serviceId = 1;
        services.name = 'Demo';
        services.email = 'picco@gmail.com';
        services.comments = 'Test';
        const errors = await validate(services);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ServiceEnquiry without valid serviceId', async (done) => {
        // ---
        const services = new ServiceEnquiry();
        services.enquiryId = 1;
        services.name = 'Demo';
        services.email = 'picco@gmail.com';
        services.comments = 'Test';
        const errors = await validate(services);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ServiceEnquiry without valid name', async (done) => {
        // ---
        const services = new ServiceEnquiry();
        services.enquiryId = 1;
        services.serviceId = 1;
        services.name = '';
        services.email = 'picco@gmail.com';
        services.comments = 'Test';
        const errors = await validate(services);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ServiceEnquiry without valid email', async (done) => {
        // ---
        const services = new ServiceEnquiry();
        services.enquiryId = 1;
        services.serviceId = 1;
        services.name = 'Demo';
        services.email = '';
        services.comments = 'Test';
        const errors = await validate(services);
        done();
    });

    test('Should not validate ServiceEnquiry without valid comments', async (done) => {
        // ---
        const services = new ServiceEnquiry();
        services.enquiryId = 1;
        services.serviceId = 1;
        services.name = 'Demo';
        services.email = 'picco@gmail.com';
        services.comments = '';
        const errors = await validate(services);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

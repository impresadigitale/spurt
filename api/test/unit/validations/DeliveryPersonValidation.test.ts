import { DeliveryPerson } from '../../../src/api/models/DeliveryPerson';
import { validate } from 'class-validator';

describe('DeliveryPerson Validations', () => {

    test('DeliveryPerson should succeed with all required fields', async (done) => {
        // ---
        const deliveryPerson = new DeliveryPerson();
        deliveryPerson.id = 1;
        deliveryPerson.vendorId = 1;
        deliveryPerson.email = 'test@gmail.com';
        const errors = await validate(deliveryPerson);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate DeliveryPerson without valid id', async (done) => {
        // ---
        const deliveryPerson = new DeliveryPerson();
        deliveryPerson.vendorId = 1;
        deliveryPerson.email = 'test@gmail.com';
        const errors = await validate(deliveryPerson);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate DeliveryPerson without valid vendor id', async (done) => {
        // ---
        const deliveryPerson = new DeliveryPerson();
        deliveryPerson.id = 1;
        deliveryPerson.email = 'test@gmail.com';
        const errors = await validate(deliveryPerson);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate DeliveryPerson without valid email', async (done) => {
        // ---
        const deliveryPerson = new DeliveryPerson();
        deliveryPerson.id = 1;
        deliveryPerson.vendorId = 1;
        deliveryPerson.email = '';
        const errors = await validate(deliveryPerson);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});

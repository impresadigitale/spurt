import { DeliveryLocation } from '../../../src/api/models/DeliveryLocation';
import { validate } from 'class-validator';

describe('DeliveryLocation Validations', () => {

    test('Delivery location should succeed with all required fields', async (done) => {
        // ---
        const deliveryLocation = new DeliveryLocation();
        deliveryLocation.deliveryLocationId = 1;
        deliveryLocation.vendorId = 1;
        deliveryLocation.zipCode = 60000;
        const errors = await validate(deliveryLocation);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate DeliveryLocation without valid id', async (done) => {
        // ---
        const deliveryLocation = new DeliveryLocation();
        deliveryLocation.vendorId = 1;
        deliveryLocation.zipCode = 60000;
        const errors = await validate(deliveryLocation);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate DeliveryLocation without valid vendor id', async (done) => {
        // ---
        const deliveryLocation = new DeliveryLocation();
        deliveryLocation.deliveryLocationId = 1;
        deliveryLocation.zipCode = 60000;
        const errors = await validate(deliveryLocation);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate DeliveryLocation without valid zip code', async (done) => {
        // ---
        const deliveryLocation = new DeliveryLocation();
        deliveryLocation.deliveryLocationId = 1;
        deliveryLocation.vendorId = 1;
        const errors = await validate(deliveryLocation);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

import { DeliveryLocationToLocation } from '../../../src/api/models/DeliveryLocationToLocation';
import { validate } from 'class-validator';

describe('DeliveryLocationToLocation Validations', () => {

    test('Delivery location should succeed with all required fields', async (done) => {
        // ---
        const deliveryLocationToLocation = new DeliveryLocationToLocation();
        deliveryLocationToLocation.id = 1;
        deliveryLocationToLocation.deliveryLocationId = 1;
        const errors = await validate(deliveryLocationToLocation);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Delivery location without valid id', async (done) => {
        // ---
        const deliveryLocationToLocation = new DeliveryLocationToLocation();
        deliveryLocationToLocation.deliveryLocationId = 1;
        const errors = await validate(deliveryLocationToLocation);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Delivery location without valid location id', async (done) => {
        // ---
        const deliveryLocationToLocation = new DeliveryLocationToLocation();
        deliveryLocationToLocation.id = 1;
        const errors = await validate(deliveryLocationToLocation);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

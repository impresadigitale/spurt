import { DeliveryPersonToLocation } from '../../../src/api/models/DeliveryPersonToLocation';
import { validate } from 'class-validator';

describe('DeliveryPersonToLocation Validations', () => {

    test('DeliveryPersonToLocation should succeed with all required fields', async (done) => {
        // ---
        const deliveryPersonToLocation = new DeliveryPersonToLocation();
        deliveryPersonToLocation.deliveryPersonToLocationId = 1;
        deliveryPersonToLocation.deliveryPersonId = 1;
        deliveryPersonToLocation.deliveryLocationId = 1;
        const errors = await validate(deliveryPersonToLocation);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate DeliveryPersonToLocation without valid id', async (done) => {
        // ---
        const deliveryPersonToLocation = new DeliveryPersonToLocation();
        deliveryPersonToLocation.deliveryPersonId = 1;
        deliveryPersonToLocation.deliveryLocationId = 1;
        const errors = await validate(deliveryPersonToLocation);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate DeliveryPersonToLocation without valid person id', async (done) => {
        // ---
        const deliveryPersonToLocation = new DeliveryPersonToLocation();
        deliveryPersonToLocation.deliveryPersonToLocationId = 1;
        deliveryPersonToLocation.deliveryLocationId = 1;
        const errors = await validate(deliveryPersonToLocation);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate DeliveryPersonToLocation without valid location id', async (done) => {
        // ---
        const deliveryPersonToLocation = new DeliveryPersonToLocation();
        deliveryPersonToLocation.deliveryPersonToLocationId = 1;
        deliveryPersonToLocation.deliveryPersonId = 1;
        const errors = await validate(deliveryPersonToLocation);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

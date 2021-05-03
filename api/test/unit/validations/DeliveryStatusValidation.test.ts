import { DeliveryStatus } from '../../../src/api/models/DeliveryStatus';
import { validate } from 'class-validator';

describe('DeliveryStatus Validations', () => {

    test('DeliveryStatus should succeed with all required fields', async (done) => {
        // ---
        const deliveryStatus = new DeliveryStatus();
        deliveryStatus.deliveryStatusId = 1;
        deliveryStatus.name = 'pending';
        const errors = await validate(deliveryStatus);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate DeliveryStatus without valid id', async (done) => {
        // ---
        const deliveryStatus = new DeliveryStatus();
        deliveryStatus.name = 'pending';
        const errors = await validate(deliveryStatus);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate DeliveryStatus without valid name', async (done) => {
        // ---
        const deliveryStatus = new DeliveryStatus();
        deliveryStatus.deliveryStatusId = 1;
        deliveryStatus.name = '';
        const errors = await validate(deliveryStatus);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

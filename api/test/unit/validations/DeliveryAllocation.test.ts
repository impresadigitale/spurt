import { DeliveryAllocation } from '../../../src/api/models/DeliveryAllocation';
import { validate } from 'class-validator';

describe('DeliveryAllocation Validations', () => {

    test('DeliveryAllocation should succeed with all required fields', async (done) => {
        // ---
        const deliveryAllocation = new DeliveryAllocation();
        deliveryAllocation.deliveryAllocationId = 1;
        deliveryAllocation.vendorOrderId = 1;
        deliveryAllocation.orderId = 1;
        deliveryAllocation.deliveryPersonId = 1;
        deliveryAllocation.deliveryOrderStatusId = 1;
        const errors = await validate(deliveryAllocation);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate DeliveryAllocation without valid id', async (done) => {
        // ---
        const deliveryAllocation = new DeliveryAllocation();
        deliveryAllocation.vendorOrderId = 1;
        deliveryAllocation.orderId = 1;
        deliveryAllocation.deliveryPersonId = 1;
        deliveryAllocation.deliveryOrderStatusId = 1;
        const errors = await validate(deliveryAllocation);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate DeliveryAllocation without valid vendor order id', async (done) => {
        // ---
        const deliveryAllocation = new DeliveryAllocation();
        deliveryAllocation.deliveryAllocationId = 1;
        deliveryAllocation.orderId = 1;
        deliveryAllocation.deliveryPersonId = 1;
        deliveryAllocation.deliveryOrderStatusId = 1;
        const errors = await validate(deliveryAllocation);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate DeliveryAllocation without valid order id', async (done) => {
        // ---
        const deliveryAllocation = new DeliveryAllocation();
        deliveryAllocation.deliveryAllocationId = 1;
        deliveryAllocation.vendorOrderId = 1;
        deliveryAllocation.deliveryPersonId = 1;
        deliveryAllocation.deliveryOrderStatusId = 1;
        const errors = await validate(deliveryAllocation);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate DeliveryAllocation without valid delivery person id', async (done) => {
        // ---
        const deliveryAllocation = new DeliveryAllocation();
        deliveryAllocation.deliveryAllocationId = 1;
        deliveryAllocation.vendorOrderId = 1;
        deliveryAllocation.orderId = 1;
        deliveryAllocation.deliveryOrderStatusId = 1;
        const errors = await validate(deliveryAllocation);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate DeliveryAllocation without valid delivery order status id', async (done) => {
        // ---
        const deliveryAllocation = new DeliveryAllocation();
        deliveryAllocation.deliveryAllocationId = 1;
        deliveryAllocation.vendorOrderId = 1;
        deliveryAllocation.orderId = 1;
        deliveryAllocation.deliveryPersonId = 1;
        const errors = await validate(deliveryAllocation);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

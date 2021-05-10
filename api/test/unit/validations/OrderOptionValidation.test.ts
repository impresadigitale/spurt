import { OrderOption } from '../../../src/api/models/OrderOption';
import { validate } from 'class-validator';

describe('OrderOption Validations', () => {

    test('OrderOption should succeed with all required fields', async (done) => {
        // ---
        const order = new OrderOption();
        order.orderOptionId = 1;
        order.orderId = 1;
        order.orderProductId = 1;
        const errors = await validate(order);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderOption without valid id', async (done) => {
        // ---
        const order = new OrderOption();
        order.orderId = 1;
        order.orderProductId = 1;
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderOption without valid order id', async (done) => {
        // ---
        const order = new OrderOption();
        order.orderOptionId = 1;
        order.orderProductId = 1;
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate OrderOption without valid product id', async (done) => {
        // ---
        const order = new OrderOption();
        order.orderOptionId = 1;
        order.orderId = 1;
        const errors = await validate(order);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

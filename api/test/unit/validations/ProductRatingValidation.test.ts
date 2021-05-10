import { ProductRating } from '../../../src/api/models/ProductRating';
import { validate } from 'class-validator';

describe('ProductRating Validations', () => {

    test('ProductRating should succeed with all required fields', async (done) => {
        // ---
        const product = new ProductRating();
        product.ratingId = 1;
        product.productId = 1;
        product.orderProductId = 1;
        product.email = 'picco@gmail.com';
        const errors = await validate(product);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductRating without valid id', async (done) => {
        // ---
        const product = new ProductRating();
        product.productId = 1;
        product.orderProductId = 1;
        product.email = 'picco@gmail.com';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductRating without valid product id', async (done) => {
        // ---
        const product = new ProductRating();
        product.ratingId = 1;
        product.orderProductId = 1;
        product.email = 'picco@gmail.com';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductRating without valid order product id', async (done) => {
        // ---
        const product = new ProductRating();
        product.ratingId = 1;
        product.productId = 1;
        product.email = 'picco@gmail.com';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductRating without valid email', async (done) => {
        // ---
        const product = new ProductRating();
        product.ratingId = 1;
        product.productId = 1;
        product.orderProductId = 1;
        product.email = '';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});

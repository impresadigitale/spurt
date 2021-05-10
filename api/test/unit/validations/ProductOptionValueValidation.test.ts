import { ProductOptionValue } from '../../../src/api/models/ProductOptionValue';
import { validate } from 'class-validator';

describe('ProductOptionValue Validations', () => {

    test('ProductOption should succeed with all required fields', async (done) => {
        // ---
        const product = new ProductOptionValue();
        product.productOptionValueId = 1;
        product.productOptionId = 1;
        product.productId = 1;
        product.price = 100;
        const errors = await validate(product);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductOption without valid id', async (done) => {
        // ---
        const product = new ProductOptionValue();
        product.productOptionId = 1;
        product.productId = 1;
        product.price = 100;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductOption without valid product option id', async (done) => {
        // ---
        const product = new ProductOptionValue();
        product.productOptionValueId = 1;
        product.productId = 1;
        product.price = 100;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductOption without valid product id', async (done) => {
        // ---
        const product = new ProductOptionValue();
        product.productOptionValueId = 1;
        product.productOptionId = 1;
        product.price = 100;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductOption without valid price', async (done) => {
        // ---
        const product = new ProductOptionValue();
        product.productOptionValueId = 1;
        product.productOptionId = 1;
        product.productId = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

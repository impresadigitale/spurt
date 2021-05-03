import { ProductOption } from '../../../src/api/models/ProductOption';
import { validate } from 'class-validator';

describe('ProductOption Validations', () => {

    test('ProductOption should succeed with all required fields', async (done) => {
        // ---
        const product = new ProductOption();
        product.productOptionId = 1;
        product.productId = 1;
        product.required = 1;
        const errors = await validate(product);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductOption without valid id', async (done) => {
        // ---
        const product = new ProductOption();
        product.productId = 1;
        product.required = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductOption without valid product option id', async (done) => {
        // ---
        const product = new ProductOption();
        product.productOptionId = 1;
        product.required = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductOption without valid required', async (done) => {
        // ---
        const product = new ProductOption();
        product.productOptionId = 1;
        product.productId = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

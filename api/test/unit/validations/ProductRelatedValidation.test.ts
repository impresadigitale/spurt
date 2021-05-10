import { ProductRelated } from '../../../src/api/models/ProductRelated';
import { validate } from 'class-validator';

describe('ProductRelated Validations', () => {

    test('ProductRelated should succeed with all required fields', async (done) => {
        // ---
        const product = new ProductRelated();
        product.id = 1;
        product.productId = 1;
        product.relatedProductId = '1';
        const errors = await validate(product);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductRelated without valid id', async (done) => {
        // ---
        const product = new ProductRelated();
        product.productId = 1;
        product.relatedProductId = '1';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductRelated without valid product id', async (done) => {
        // ---
        const product = new ProductRelated();
        product.id = 1;
        product.relatedProductId = '1';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductRelated without valid related product id', async (done) => {
        // ---
        const product = new ProductRelated();
        product.id = 1;
        product.productId = 1;
        product.relatedProductId = '';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});

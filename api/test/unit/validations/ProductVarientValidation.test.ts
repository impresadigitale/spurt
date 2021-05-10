import { ProductVarient } from '../../../src/api/models/ProductVarient';
import { validate } from 'class-validator';

describe('ProductVarient Validations', () => {

    test('ProductVarient should succeed with all required field', async (done) => {
        // ---
        const productVarientData = new ProductVarient();
        productVarientData.id = 1;
        productVarientData.productId = 1;
        productVarientData.varientsId = 1;
        const errors = await validate(productVarientData);
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductVarient without valid id', async (done) => {
        // ---
        const productVarientData = new ProductVarient();
        productVarientData.productId = 1;
        productVarientData.varientsId = 1;
        const errors = await validate(productVarientData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductVarient without valid productId', async (done) => {
        // ---
        const productVarientData = new ProductVarient();
        productVarientData.id = 1;
        productVarientData.varientsId = 1;
        const errors = await validate(productVarientData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductVarient without valid varientsId', async (done) => {
        // ---
        const productVarientData = new ProductVarient();
        productVarientData.id = 1;
        productVarientData.productId = 1;
        const errors = await validate(productVarientData);
        expect(1).toEqual(errors.length);
        done();
    });
});

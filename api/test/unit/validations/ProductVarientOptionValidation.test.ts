import { ProductVarientOption } from '../../../src/api/models/ProductVarientOption';
import { validate } from 'class-validator';

describe('ProductVarientOption Validations', () => {

    test('ProductVarientOption should succeed with all required field', async (done) => {
        // ---
        const productVarientOptionData = new ProductVarientOption();
        productVarientOptionData.id = 1;
        productVarientOptionData.productId = 1;
        productVarientOptionData.skuId = 1;
        productVarientOptionData.varientName = 'test product';
        const errors = await validate(productVarientOptionData);
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductVarientOption without valid id', async (done) => {
        // ---
        const productVarientOptionData = new ProductVarientOption();
        productVarientOptionData.productId = 1;
        productVarientOptionData.skuId = 1;
        productVarientOptionData.varientName = 'test product';
        const errors = await validate(productVarientOptionData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductVarientOption without valid productId', async (done) => {
        // ---
        const productVarientOptionData = new ProductVarientOption();
        productVarientOptionData.id = 1;
        productVarientOptionData.skuId = 1;
        productVarientOptionData.varientName = 'test product';
        const errors = await validate(productVarientOptionData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductVarientOption without valid skuId', async (done) => {
        // ---
        const productVarientOptionData = new ProductVarientOption();
        productVarientOptionData.id = 1;
        productVarientOptionData.productId = 1;
        productVarientOptionData.varientName = 'test product';
        const errors = await validate(productVarientOptionData);
        expect(1).toEqual(errors.length);
        done();
    });
    test('Should not validate ProductVarientOption without valid varientName', async (done) => {
        // ---
        const productVarientOptionData = new ProductVarientOption();
        productVarientOptionData.id = 1;
        productVarientOptionData.productId = 1;
        productVarientOptionData.skuId = 1;
        productVarientOptionData.varientName = '';
        const errors = await validate(productVarientOptionData);
        expect(1).toEqual(errors.length);
        done();
    });
});

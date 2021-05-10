import { ProductVarientOptionDetail } from '../../../src/api/models/ProductVarientOptionDetail';
import { validate } from 'class-validator';

describe('ProductVarientOptionDetail Validations', () => {

    test('ProductVarientOptionDetail should succeed with all required field', async (done) => {
        // ---
        const productVarientOptionDetailData = new ProductVarientOptionDetail();
        productVarientOptionDetailData.id = 1;
        productVarientOptionDetailData.varientsValueId = 1;
        productVarientOptionDetailData.productVarientOptionId = 1;
        const errors = await validate(productVarientOptionDetailData);
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductVarientOptionDetail without valid id', async (done) => {
        // ---
        const productVarientOptionDetailData = new ProductVarientOptionDetail();
        productVarientOptionDetailData.varientsValueId = 1;
        productVarientOptionDetailData.productVarientOptionId = 1;
        const errors = await validate(productVarientOptionDetailData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductVarientOptionDetail without valid varientsValueId', async (done) => {
        // ---
        const productVarientOptionDetailData = new ProductVarientOptionDetail();
        productVarientOptionDetailData.id = 1;
        productVarientOptionDetailData.productVarientOptionId = 1;
        const errors = await validate(productVarientOptionDetailData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductVarientOptionDetail without valid productVarientOptionId', async (done) => {
        // ---
        const productVarientOptionDetailData = new ProductVarientOptionDetail();
        productVarientOptionDetailData.id = 1;
        productVarientOptionDetailData.varientsValueId = 1;
        const errors = await validate(productVarientOptionDetailData);
        expect(1).toEqual(errors.length);
        done();
    });
  });

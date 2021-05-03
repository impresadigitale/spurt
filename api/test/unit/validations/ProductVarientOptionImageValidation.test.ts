import { ProductVarientOptionImage } from '../../../src/api/models/ProductVarientOptionImage';
import { validate } from 'class-validator';

describe('ProductVarientOptionImage Validations', () => {

    test('ProductVarientOptionImage should succeed with all required field', async (done) => {
        // ---
        const productVarientOptionImageData = new ProductVarientOptionImage();
        productVarientOptionImageData.id = 1;
        productVarientOptionImageData.containerName = 'test';
        productVarientOptionImageData.productVarientOptionId = 1;
        const errors = await validate(productVarientOptionImageData);
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductVarientOptionImage without valid id', async (done) => {
        // ---
        const productVarientOptionImageData = new ProductVarientOptionImage();
        productVarientOptionImageData.containerName = 'test';
        productVarientOptionImageData.productVarientOptionId = 1;
        const errors = await validate(productVarientOptionImageData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductVarientOptionImage without valid containerName', async (done) => {
        // ---
        const productVarientOptionImageData = new ProductVarientOptionImage();
        productVarientOptionImageData.id = 1;
        productVarientOptionImageData.containerName = '';
        productVarientOptionImageData.productVarientOptionId = 1;
        const errors = await validate(productVarientOptionImageData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductVarientOptionImage without valid productVarientOptionId', async (done) => {
        // ---
        const productVarientOptionImageData = new ProductVarientOptionImage();
        productVarientOptionImageData.id = 1;
        productVarientOptionImageData.containerName = 'test';
        const errors = await validate(productVarientOptionImageData);
        expect(1).toEqual(errors.length);
        done();
    });
  });

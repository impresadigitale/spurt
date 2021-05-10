import { ProductQuestion } from '../../../src/api/models/ProductQuestion';
import { validate } from 'class-validator';

describe('ProductQuestion Validations', () => {

    test('ProductQuestion should succeed with all required fields', async (done) => {
        // ---
        const product = new ProductQuestion();
        product.questionId = 1;
        product.productId = 1;
        product.question = 'test';
        const errors = await validate(product);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductQuestion without valid id', async (done) => {
        // ---
        const product = new ProductQuestion();
        product.productId = 1;
        product.question = 'test';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductQuestion without valid product id', async (done) => {
        // ---
        const product = new ProductQuestion();
        product.questionId = 1;
        product.question = 'test';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductQuestion without valid product question', async (done) => {
        // ---
        const product = new ProductQuestion();
        product.questionId = 1;
        product.productId = 1;
        product.question = '';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

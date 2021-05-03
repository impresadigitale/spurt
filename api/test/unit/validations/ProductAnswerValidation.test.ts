import { ProductAnswer } from '../../../src/api/models/ProductAnswer';
import { validate } from 'class-validator';

describe('ProductAnswerValidations', () => {

    test('ProductAnswer should succeed with all required fields', async (done) => {
        // ---
        const product = new ProductAnswer();
        product.answerId = 1;
        product.questionId = 1;
        product.answer = 'one';
        product.defaultAnswer = 1;
        const errors = await validate(product);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductAnswer without valid id', async (done) => {
        // ---
        const product = new ProductAnswer();
        product.questionId = 1;
        product.answer = 'one';
        product.defaultAnswer = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductAnswer without valid question id', async (done) => {
        // ---
        const product = new ProductAnswer();
        product.answerId = 1;
        product.answer = 'one';
        product.defaultAnswer = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductAnswer without valid answer', async (done) => {
        // ---
        const product = new ProductAnswer();
        product.answerId = 1;
        product.questionId = 1;
        product.answer = '';
        product.defaultAnswer = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductAnswer without valid default answer', async (done) => {
        // ---
        const product = new ProductAnswer();
        product.answerId = 1;
        product.questionId = 1;
        product.answer = 'one';
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

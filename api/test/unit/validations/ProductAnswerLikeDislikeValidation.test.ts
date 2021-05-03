import { ProductAnswerLikeDislike } from '../../../src/api/models/ProductAnswerLikeDislike';
import { validate } from 'class-validator';

describe('ProductAnswerLikeDislikeValidations', () => {

    test('ProductAnswerLikeDislike should succeed with all required fields', async (done) => {
        // ---
        const product = new ProductAnswerLikeDislike();
        product.id = 1;
        product.questionId = 1;
        product.answerId = 1;
        product.customerId = 1;
        const errors = await validate(product);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductAnswerLikeDislike without valid id', async (done) => {
        // ---
        const product = new ProductAnswerLikeDislike();
        product.questionId = 1;
        product.answerId = 1;
        product.customerId = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductAnswerLikeDislike without valid question id', async (done) => {
        // ---
        const product = new ProductAnswerLikeDislike();
        product.id = 1;
        product.answerId = 1;
        product.customerId = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductAnswerLikeDislike without valid answer id', async (done) => {
        // ---
        const product = new ProductAnswerLikeDislike();
        product.id = 1;
        product.questionId = 1;
        product.customerId = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ProductAnswerLikeDislike without valid customer id', async (done) => {
        // ---
        const product = new ProductAnswerLikeDislike();
        product.id = 1;
        product.questionId = 1;
        product.answerId = 1;
        const errors = await validate(product);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

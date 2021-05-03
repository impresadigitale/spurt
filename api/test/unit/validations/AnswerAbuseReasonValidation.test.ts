import { AnswerAbuseReason } from '../../../src/api/models/AnswerAbuseReason';
import { validate } from 'class-validator';

describe('AnswerAbuseResonValidations', () => {

    test('AnswerAbuseReason should succeed with all required fields', async (done) => {
        // ---
        const answerAbuseReason = new AnswerAbuseReason();
        answerAbuseReason.id = 1;
        answerAbuseReason.reason = 'test';
        const errors = await validate(answerAbuseReason);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate AnswerAbuseReason without valid id', async (done) => {
        // ---
        const answerAbuseReason = new AnswerAbuseReason();
        answerAbuseReason.reason = 'test';
        const errors = await validate(answerAbuseReason);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate AnswerAbuseReason without reason', async (done) => {
        // ---
        const answerAbuseReason = new AnswerAbuseReason();
        answerAbuseReason.id = 1;
        answerAbuseReason.reason = '';
        const errors = await validate(answerAbuseReason);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

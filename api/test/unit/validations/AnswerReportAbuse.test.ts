import { AnswerReportAbuse } from '../../../src/api/models/AnswerReportAbuse';
import { validate } from 'class-validator';

describe('AnswerReportAbuseValidations', () => {

    test('AnswerReportAbuse should succeed with all required fields', async (done) => {
        // ---
        const answerReportAbuse = new AnswerReportAbuse();
        answerReportAbuse.id = 1;
        answerReportAbuse.customerId = 1;
        answerReportAbuse.answerId = 1;
        answerReportAbuse.questionId = 1;
        const errors = await validate(answerReportAbuse);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate AnswerReportAbuse without valid id', async (done) => {
        // ---
        const answerReportAbuse = new AnswerReportAbuse();
        answerReportAbuse.customerId = 1;
        answerReportAbuse.answerId = 1;
        answerReportAbuse.questionId = 1;
        const errors = await validate(answerReportAbuse);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate AnswerReportAbuse without valid customer id', async (done) => {
        // ---
        const answerReportAbuse = new AnswerReportAbuse();
        answerReportAbuse.id = 1;
        answerReportAbuse.answerId = 1;
        answerReportAbuse.questionId = 1;
        const errors = await validate(answerReportAbuse);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate AnswerReportAbuse without valid answer id', async (done) => {
        // ---
        const answerReportAbuse = new AnswerReportAbuse();
        answerReportAbuse.id = 1;
        answerReportAbuse.customerId = 1;
        answerReportAbuse.questionId = 1;
        const errors = await validate(answerReportAbuse);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate AnswerReportAbuse without valid question id', async (done) => {
        // ---
        const answerReportAbuse = new AnswerReportAbuse();
        answerReportAbuse.id = 1;
        answerReportAbuse.customerId = 1;
        answerReportAbuse.answerId = 1;
        const errors = await validate(answerReportAbuse);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

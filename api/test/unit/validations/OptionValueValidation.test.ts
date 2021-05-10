import { OptionValue } from '../../../src/api/models/OptionValue';
import { validate } from 'class-validator';

describe('OptionValue Validations', () => {

    test('Option should succeed with all required fields', async (done) => {
        // ---
        const optionValue = new OptionValue();
        optionValue.optionValueId = 1;
        optionValue.optionId = 1;
        const errors = await validate(optionValue);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Option without valid id', async (done) => {
        // ---
        const optionValue = new OptionValue();
        optionValue.optionId = 1;
        const errors = await validate(optionValue);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Option without valid option id', async (done) => {
        // ---
        const optionValue = new OptionValue();
        optionValue.optionValueId = 1;
        const errors = await validate(optionValue);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

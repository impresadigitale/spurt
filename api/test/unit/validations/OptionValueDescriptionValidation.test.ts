import { OptionValueDescription } from '../../../src/api/models/OptionValueDescription';
import { validate } from 'class-validator';

describe('OptionValueDescription Validations', () => {

    test('OptionValueDescription should succeed with all required fields', async (done) => {
        // ---
        const optionValueDescription = new OptionValueDescription();
        optionValueDescription.optionValueDescriptionId = 1;
        optionValueDescription.optionValueId = 1;
        optionValueDescription.name = 'test';
        const errors = await validate(optionValueDescription);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate OptionValueDescription without valid id', async (done) => {
        // ---
        const optionValueDescription = new OptionValueDescription();
        optionValueDescription.optionValueId = 1;
        optionValueDescription.name = 'test';
        const errors = await validate(optionValueDescription);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate OptionValueDescription without valid option value id', async (done) => {
        // ---
        const optionValueDescription = new OptionValueDescription();
        optionValueDescription.optionValueDescriptionId = 1;
        optionValueDescription.name = 'test';
        const errors = await validate(optionValueDescription);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate OptionValueDescription without valid name', async (done) => {
        // ---
        const optionValueDescription = new OptionValueDescription();
        optionValueDescription.optionValueDescriptionId = 1;
        optionValueDescription.optionValueId = 1;
        optionValueDescription.name = '';
        const errors = await validate(optionValueDescription);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

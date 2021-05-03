import { OptionDescription } from '../../../src/api/models/OptionDescription';
import { validate } from 'class-validator';

describe('Option Description Validations', () => {

    test('Option Description should succeed with all required fields', async (done) => {
        // ---
        const optionDescription = new OptionDescription();
        optionDescription.optionDescriptionId = 1;
        optionDescription.optionId = 1;
        optionDescription.name = 'Test';
        const errors = await validate(optionDescription);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Option Description without valid id', async (done) => {
        // ---
        const optionDescription = new OptionDescription();
        optionDescription.optionId = 1;
        optionDescription.name = 'Test';
        const errors = await validate(optionDescription);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Option Description without valid option description id', async (done) => {
        // ---
        const optionDescription = new OptionDescription();
        optionDescription.optionDescriptionId = 1;
        optionDescription.name = 'Test';
        const errors = await validate(optionDescription);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Option Description without valid name', async (done) => {
        // ---
        const optionDescription = new OptionDescription();
        optionDescription.optionDescriptionId = 1;
        optionDescription.optionId = 1;
        optionDescription.name = '';
        const errors = await validate(optionDescription);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

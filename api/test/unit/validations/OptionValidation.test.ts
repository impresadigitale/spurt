import { Option } from '../../../src/api/models/Option';
import { validate } from 'class-validator';

describe('Option Validations', () => {

    test('Option should succeed with all required fields', async (done) => {
        // ---
        const option = new Option();
        option.optionId = 1;
        option.type = 'demo';
        const errors = await validate(option);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Option without valid id', async (done) => {
        // ---
        const option = new Option();
        option.type = 'demo';
        const errors = await validate(option);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Option without valid type', async (done) => {
        // ---
        const option = new Option();
        option.optionId = 1;
        option.type = '';
        const errors = await validate(option);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

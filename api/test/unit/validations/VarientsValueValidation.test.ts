import { VarientsValue } from '../../../src/api/models/VarientsValue';
import { validate } from 'class-validator';

describe('VarientsValue Validations', () => {

    test('VarientsValue should succeed with all required field', async (done) => {
        // ---
        const varientsValue = new VarientsValue();
        varientsValue.id = 1;
        varientsValue.varientsId = 1;
        varientsValue.valueName = 'test';
        const errors = await validate(varientsValue);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate VarientsValue without id', async (done) => {
        // ---
        const varientsValue = new VarientsValue();
        varientsValue.varientsId = 1;
        varientsValue.valueName = 'test';
        const errors = await validate(varientsValue);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VarientsValue without varientsId', async (done) => {
        // ---
        const varientsValue = new VarientsValue();
        varientsValue.id = 1;
        varientsValue.valueName = 'test';
        const errors = await validate(varientsValue);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VarientsValue without valueName', async (done) => {
        // ---
        const varientsValue = new VarientsValue();
        varientsValue.id = 1;
        varientsValue.varientsId = 1;
        const errors = await validate(varientsValue);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

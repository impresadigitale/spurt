import { SizeChart } from '../../../src/api/models/SizeChart';
import { validate } from 'class-validator';

describe('SizeChart Validations', () => {

    test('SizeChart should succeed with all required field', async (done) => {
        // ---
        const size = new SizeChart();
        size.id = 1;
        size.title = 'Demo';
        size.templateId = 1;
        const errors = await validate(size);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate SizeChart without valid id', async (done) => {
        // ---
        const size = new SizeChart();
        size.title = 'Demo';
        size.templateId = 1;
        const errors = await validate(size);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate SizeChart without valid title', async (done) => {
        // ---
        const size = new SizeChart();
        size.id = 1;
        size.title = '';
        size.templateId = 1;
        const errors = await validate(size);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate SizeChart without valid title', async (done) => {
        // ---
        const size = new SizeChart();
        size.id = 1;
        size.title = 'Demo';
        const errors = await validate(size);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});

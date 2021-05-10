import { SizeChartHeader } from '../../../src/api/models/SizeChartHeader';
import { validate } from 'class-validator';

describe('SizeChartHeaderValidations', () => {

    test('SizeChartHeader should succeed with all required field', async (done) => {
        // ---
        const size = new SizeChartHeader();
        size.id = 1;
        size.sizeChartId = 1;
        size.headerTextValue = 'test';
        const errors = await validate(size);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate SizeChartHeader without valid id', async (done) => {
        // ---
        const size = new SizeChartHeader();
        size.sizeChartId = 1;
        size.headerTextValue = 'test';
        const errors = await validate(size);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate SizeChartHeader without valid sizeChartId', async (done) => {
        // ---
        const size = new SizeChartHeader();
        size.id = 1;
        size.headerTextValue = 'test';
        const errors = await validate(size);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate SizeChartHeader without valid headerTextValue', async (done) => {
        // ---
        const size = new SizeChartHeader();
        size.id = 1;
        size.headerTextValue = 'test';
        const errors = await validate(size);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

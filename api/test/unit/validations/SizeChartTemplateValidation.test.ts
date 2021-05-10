import { SizeChartTemplate } from '../../../src/api/models/SizeChartTemplate';
import { validate } from 'class-validator';

describe('SizeChartTemplate Validations', () => {

    test('SizeChartTemplate should succeed with all required field', async (done) => {
        // ---
        const sizeChartTemplateData = new SizeChartTemplate();
        sizeChartTemplateData.id = 1;
        sizeChartTemplateData.templateName = 'test';
        const errors = await validate(sizeChartTemplateData);
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate SizeChartTemplate without valid id', async (done) => {
        // ---
        const sizeChartTemplateData = new SizeChartTemplate();
        sizeChartTemplateData.templateName = 'test';
        const errors = await validate(sizeChartTemplateData);
        expect(1).toEqual(errors.length);
        done();
    });

   test('Should not validate SizeChartTemplate without valid templateName', async (done) => {
        // ---
        const sizeChartTemplateData = new SizeChartTemplate();
        sizeChartTemplateData.id = 1;
        const errors = await validate(sizeChartTemplateData);
        expect(1).toEqual(errors.length);
        done();
    });
});

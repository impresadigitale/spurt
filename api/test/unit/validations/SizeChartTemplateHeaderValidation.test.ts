import { SizeChartTemplateHeader } from '../../../src/api/models/SizeChartTemplateHeader';
import { validate } from 'class-validator';

describe('SizeChartTemplateHeader Validations', () => {

    test('SizeChartTemplateHeader should succeed with all required field', async (done) => {
        // ---
        const sizeChartTemplateHeaderData = new SizeChartTemplateHeader();
        sizeChartTemplateHeaderData.id = 1;
        sizeChartTemplateHeaderData.templateId = 1;
        sizeChartTemplateHeaderData.headerText = 'test';
        sizeChartTemplateHeaderData.headerId = 1;
        const errors = await validate(sizeChartTemplateHeaderData);
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate SizeChartTemplateHeader without valid id', async (done) => {
        // ---
        const sizeChartTemplateHeaderData = new SizeChartTemplateHeader();
        sizeChartTemplateHeaderData.templateId = 1;
        sizeChartTemplateHeaderData.headerText = 'test';
        sizeChartTemplateHeaderData.headerId = 1;
        const errors = await validate(sizeChartTemplateHeaderData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate SizeChartTemplateHeader without valid templateId', async (done) => {
        // ---
        const sizeChartTemplateHeaderData = new SizeChartTemplateHeader();
        sizeChartTemplateHeaderData.id = 1;
        sizeChartTemplateHeaderData.headerText = 'test';
        sizeChartTemplateHeaderData.headerId = 1;
        const errors = await validate(sizeChartTemplateHeaderData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate SizeChartTemplateHeader without valid headerText', async (done) => {
        // ---
        const sizeChartTemplateHeaderData = new SizeChartTemplateHeader();
        sizeChartTemplateHeaderData.id = 1;
        sizeChartTemplateHeaderData.templateId = 1;
        sizeChartTemplateHeaderData.headerId = 1;
        const errors = await validate(sizeChartTemplateHeaderData);
        expect(1).toEqual(errors.length);
        done();
    });
    test('Should not validate SizeChartTemplateHeader without valid headerId', async (done) => {
        // ---
        const sizeChartTemplateHeaderData = new SizeChartTemplateHeader();
        sizeChartTemplateHeaderData.id = 1;
        sizeChartTemplateHeaderData.templateId = 1;
        sizeChartTemplateHeaderData.headerText = 'test';
        const errors = await validate(sizeChartTemplateHeaderData);
        expect(1).toEqual(errors.length);
        done();
    });
});

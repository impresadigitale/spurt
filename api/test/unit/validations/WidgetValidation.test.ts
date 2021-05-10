import { Widget } from '../../../src/api/models/Widget';
import { validate } from 'class-validator';

describe('Widget Validations', () => {

    test('Widget should succeed with all required fields', async (done) => {
        // ---
        const widgetData = new Widget();
        widgetData.widgetId = 1;
        widgetData.widgetTitle = 'test tilte';
        widgetData.widgetLinkType = 1;
        widgetData.widgetSlugName = 'test_slug';
        const errors = await validate(widgetData);
        expect(0).toEqual(errors.length);
        done();
    });

   test('Should not validate Widget without valid widgetId', async (done) => {
        // ---
        const widgetData = new Widget();
        widgetData.widgetTitle = 'test tilte';
        widgetData.widgetLinkType = 1;
        widgetData.widgetSlugName = 'test_slug';
        const errors = await validate(widgetData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Widget without valid widgetTitle', async (done) => {
        // ---
        const widgetData = new Widget();
        widgetData.widgetId = 1;
        widgetData.widgetTitle = '';
        widgetData.widgetLinkType = 1;
        widgetData.widgetSlugName = 'test_slug';
        const errors = await validate(widgetData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Widget without valid widgetLinkType', async (done) => {
        // ---
        const widgetData = new Widget();
        widgetData.widgetId = 1;
        widgetData.widgetTitle = 'test';
        widgetData.widgetSlugName = 'test_slug';
        const errors = await validate(widgetData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Widget without valid widgetSlugName', async (done) => {
        // ---
        const widgetData = new Widget();
        widgetData.widgetId = 1;
        widgetData.widgetTitle = 'test tilte';
        widgetData.widgetLinkType = 1;
        widgetData.widgetSlugName = '';
        const errors = await validate(widgetData);
        expect(1).toEqual(errors.length);
        done();
    });
});

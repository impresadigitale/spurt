import { WidgetItem } from '../../../src/api/models/WidgetItem';
import { validate } from 'class-validator';

describe('WidgetItem Validations', () => {

    test('WidgetItem should succeed with all required fields', async (done) => {
        // ---
        const widgetItemData = new WidgetItem();
        widgetItemData.id = 1;
        widgetItemData.widgetId = 1;
        widgetItemData.refId = 1;
        const errors = await validate(widgetItemData);
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate WidgetItem without valid id', async (done) => {
        // ---
        const widgetItemData = new WidgetItem();
        widgetItemData.widgetId = 1;
        widgetItemData.refId = 1;
        const errors = await validate(widgetItemData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate WidgetItem without valid refId', async (done) => {
        // ---
        const widgetItemData = new WidgetItem();
        widgetItemData.id = 1;
        widgetItemData.widgetId = 1;
        const errors = await validate(widgetItemData);
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate WidgetItem without valid widgetId', async (done) => {
        // ---
        const widgetItemData = new WidgetItem();
        widgetItemData.id = 1;
        widgetItemData.refId = 1;
        const errors = await validate(widgetItemData);
        expect(1).toEqual(errors.length);
        done();
    });
});

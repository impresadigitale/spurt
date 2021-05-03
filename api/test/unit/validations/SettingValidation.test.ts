import { Settings } from '../../../src/api/models/Setting';
import { validate } from 'class-validator';

describe('Settings Validations', () => {

    test('Settings should succeed with all required field', async (done) => {
        // ---
        const settings = new Settings();
        settings.settingsId = 1;
        settings.storeName = 'spurt';
        settings.orderStatus = 1;
        settings.storeEmail = 'suprt@gmail.com';
        const errors = await validate(settings);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Settings without valid settingsId', async (done) => {
        // ---
        const settings = new Settings();
        settings.storeName = 'spurt';
        settings.orderStatus = 1;
        settings.storeEmail = 'suprt@gmail.com';
        const errors = await validate(settings);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Settings without valid store name', async (done) => {
        // ---
        const settings = new Settings();
        settings.settingsId = 1;
        settings.storeName = '';
        settings.orderStatus = 1;
        settings.storeEmail = 'suprt@gmail.com';
        const errors = await validate(settings);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Settings without valid settingsId', async (done) => {
        // ---
        const settings = new Settings();
        settings.settingsId = 1;
        settings.storeName = 'spurt';
        settings.storeEmail = 'suprt@gmail.com';
        const errors = await validate(settings);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Settings without valid storeEmail', async (done) => {
        // ---
        const settings = new Settings();
        settings.settingsId = 1;
        settings.storeName = 'spurt';
        settings.orderStatus = 1;
        settings.storeEmail = '';
        const errors = await validate(settings);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

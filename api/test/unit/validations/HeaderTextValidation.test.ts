import { HeaderText } from '../../../src/api/models/HeaderTextModel';
import { validate } from 'class-validator';

describe('HeaderTextValidations', () => {

    test('HeaderText should succeed with all required fields', async (done) => {
        // ---
        const headertext = new HeaderText();
        headertext.id = 1;
        headertext.headerText = 'Demo';
        const errors = await validate(headertext);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate HeaderText without valid id', async (done) => {
        // ---
        const headertext = new HeaderText();
        headertext.headerText = 'Demo';
        const errors = await validate(headertext);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate HeaderText without valid id', async (done) => {
        // ---
        const headertext = new HeaderText();
        headertext.id = 1;
        headertext.headerText = '';
        const errors = await validate(headertext);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

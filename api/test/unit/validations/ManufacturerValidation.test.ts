import { Manufacturer } from '../../../src/api/models/ManufacturerModel';
import { validate } from 'class-validator';

describe('Manufacturer Validations', () => {

    test('Manufacturer should succeed with all required fields', async (done) => {
        // ---
        const manufacturer = new Manufacturer();
        manufacturer.manufacturerId = 1;
        manufacturer.name = 'Test';
        const errors = await validate(manufacturer);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Manufacturer without valid id', async (done) => {
        // ---
        const manufacturer = new Manufacturer();
        manufacturer.name = 'Test';
        const errors = await validate(manufacturer);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Manufacturer without valid name', async (done) => {
        // ---
        const manufacturer = new Manufacturer();
        manufacturer.manufacturerId = 1;
        manufacturer.name = '';
        const errors = await validate(manufacturer);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});

import { Attribute } from '../../../src/api/models/Attribute';
import { validate } from 'class-validator';

describe('AttributeValidations', () => {

    test('Attribute should succeed with all required fields', async (done) => {
        // ---
        const attribute = new Attribute();
        attribute.attributeId = 1;
        attribute.groupId = 1;
        attribute.attributeName = 'list';
        attribute.sortOrder = 1;
        const errors = await validate(attribute);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Attribute without valid id', async (done) => {
        // ---
        const attribute = new Attribute();
        attribute.groupId = 1;
        attribute.attributeName = 'list';
        attribute.sortOrder = 1;
        const errors = await validate(attribute);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Attribute without valid group id', async (done) => {
        // ---
        const attribute = new Attribute();
        attribute.attributeId = 1;
        attribute.attributeName = 'list';
        attribute.sortOrder = 1;
        const errors = await validate(attribute);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Attribute without valid name', async (done) => {
        // ---
        const attribute = new Attribute();
        attribute.attributeId = 1;
        attribute.groupId = 1;
        attribute.attributeName = '';
        attribute.sortOrder = 1;
        const errors = await validate(attribute);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Attribute without valid sortorder', async (done) => {
        // ---
        const attribute = new Attribute();
        attribute.attributeId = 1;
        attribute.groupId = 1;
        attribute.attributeName = 'list';
        const errors = await validate(attribute);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

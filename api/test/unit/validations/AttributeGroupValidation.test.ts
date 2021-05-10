import { AttributeGroup } from '../../../src/api/models/AttributeGroup';
import { validate } from 'class-validator';

describe('AttributeValidations', () => {

    test('Attribute group should succeed with all required fields', async (done) => {
        // ---
        const attribute = new AttributeGroup();
        attribute.groupId = 1;
        attribute.attributeGroupName = 'list';
        const errors = await validate(attribute);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Attribute group without valid group id', async (done) => {
        // ---
        const attribute = new AttributeGroup();
        attribute.attributeGroupName = 'list';
        const errors = await validate(attribute);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Attribute group without valid group name', async (done) => {
        // ---
        const attribute = new AttributeGroup();
        attribute.groupId = 1;
        attribute.attributeGroupName = '';
        const errors = await validate(attribute);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});

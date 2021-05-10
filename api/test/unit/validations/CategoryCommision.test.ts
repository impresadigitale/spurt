import { CategoryCommission } from '../../../src/api/models/CategoryCommission';
import { validate } from 'class-validator';

describe('CategoryCommission Validations', () => {

    test('CategoryCommission should succeed with all required fields', async (done) => {
        // ---
        const categoryCommission = new CategoryCommission();
        categoryCommission.categoryCommissionId = 1;
        categoryCommission.categoryId = 1;
        const errors = await validate(categoryCommission);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate CategoryCommission without valid id', async (done) => {
        // ---
        const categoryCommission = new CategoryCommission();
        categoryCommission.categoryId = 1;
        const errors = await validate(categoryCommission);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate CategoryCommission without valid category id', async (done) => {
        // ---
        const categoryCommission = new CategoryCommission();
        categoryCommission.categoryId = 1;
        const errors = await validate(categoryCommission);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});

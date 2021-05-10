import { ServiceCategoryPath } from '../../../src/api/models/ServiceCategoryPath';
import { validate } from 'class-validator';

describe('ServiceCategoryPath Validations', () => {

    test('ServiceCategoryPath should succeed with all required field', async (done) => {
        // ---
        const serviceCategoryPath = new ServiceCategoryPath();
        serviceCategoryPath.categoryPathId = 1;
        serviceCategoryPath.serviceCategoryId = 1;
        serviceCategoryPath.pathId = 1;
        const errors = await validate(serviceCategoryPath);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate ServiceCategoryPath without valid categoryPathId', async (done) => {
        // ---
        const serviceCategoryPath = new ServiceCategoryPath();
        serviceCategoryPath.serviceCategoryId = 1;
        serviceCategoryPath.pathId = 1;
        const errors = await validate(serviceCategoryPath);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ServiceCategoryPath without valid serviceCategoryId', async (done) => {
        // ---
        const serviceCategoryPath = new ServiceCategoryPath();
        serviceCategoryPath.categoryPathId = 1;
        serviceCategoryPath.pathId = 1;
        const errors = await validate(serviceCategoryPath);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate ServiceCategoryPath without valid pathId', async (done) => {
        // ---
        const serviceCategoryPath = new ServiceCategoryPath();
        serviceCategoryPath.categoryPathId = 1;
        serviceCategoryPath.serviceCategoryId = 1;
        const errors = await validate(serviceCategoryPath);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});

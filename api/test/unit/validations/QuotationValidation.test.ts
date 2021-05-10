import { Quotation } from '../../../src/api/models/Quotation';
import { validate } from 'class-validator';

describe('QuotationValidations', () => {

    test('Quotation should succeed with all required field', async (done) => {
        // ---
        const quotation = new Quotation();
        quotation.id = 1;
        quotation.productId = 1;
        quotation.customerId = 1;
        const errors = await validate(quotation);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Quotation without valid id', async (done) => {
        // ---
        const quotation = new Quotation();
        quotation.productId = 1;
        quotation.customerId = 1;
        const errors = await validate(quotation);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Quotation without valid productId', async (done) => {
        // ---
        const quotation = new Quotation();
        quotation.id = 1;
        quotation.customerId = 1;
        const errors = await validate(quotation);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Quotation without valid customerId', async (done) => {
        // ---
        const quotation = new Quotation();
        quotation.id = 1;
        quotation.productId = 1;
        const errors = await validate(quotation);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});

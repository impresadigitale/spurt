import { CustomerDocument } from '../../../src/api/models/CustomerDocument';
import { validate } from 'class-validator';

describe('CustomerDocument Validations', () => {

    test('CustomerDocument should succeed with all required fields', async (done) => {
        // ---
        const customerDocument = new CustomerDocument();
        customerDocument.customerDocumentId = 1;
        customerDocument.customerId = 1;
        customerDocument.title = 'test';
        const errors = await validate(customerDocument);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate CustomerDocument without valid id', async (done) => {
        // ---
        const customerDocument = new CustomerDocument();
        customerDocument.customerId = 1;
        customerDocument.title = 'test';
        const errors = await validate(customerDocument);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate CustomerDocument without valid customer id', async (done) => {
        // ---
        const customerDocument = new CustomerDocument();
        customerDocument.customerDocumentId = 1;
        customerDocument.title = 'test';
        const errors = await validate(customerDocument);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate CustomerDocument without valid title', async (done) => {
        // ---
        const customerDocument = new CustomerDocument();
        customerDocument.customerDocumentId = 1;
        customerDocument.customerId = 1;
        customerDocument.title = '';
        const errors = await validate(customerDocument);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

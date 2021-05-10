import { VendorCoupon } from '../../../src/api/models/VendorCoupon';
import { validate } from 'class-validator';

describe('VendorCoupon Validations', () => {

    test('VendorCoupon should succeed with all required field', async (done) => {
        // ---
        const vendorCoupon = new VendorCoupon();
        vendorCoupon.vendorCouponId = 1;
        vendorCoupon.vendorId = 1;
        vendorCoupon.couponName = 'Diwali';
        vendorCoupon.discount = 100;
        const errors = await validate(vendorCoupon);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorCoupon without vendorCouponId', async (done) => {
        // ---
        const vendorCoupon = new VendorCoupon();
        vendorCoupon.vendorId = 1;
        vendorCoupon.couponName = 'Diwali';
        vendorCoupon.discount = 100;
        const errors = await validate(vendorCoupon);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorCoupon without vendorId', async (done) => {
        // ---
        const vendorCoupon = new VendorCoupon();
        vendorCoupon.vendorCouponId = 1;
        vendorCoupon.couponName = 'Diwali';
        vendorCoupon.discount = 100;
        const errors = await validate(vendorCoupon);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorCoupon without couponName', async (done) => {
        // ---
        const vendorCoupon = new VendorCoupon();
        vendorCoupon.vendorCouponId = 1;
        vendorCoupon.vendorId = 1;
        vendorCoupon.couponName = '';
        vendorCoupon.discount = 100;
        const errors = await validate(vendorCoupon);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate VendorCoupon without discount', async (done) => {
        // ---
        const vendorCoupon = new VendorCoupon();
        vendorCoupon.vendorCouponId = 1;
        vendorCoupon.vendorId = 1;
        vendorCoupon.couponName = 'Diwali';
        const errors = await validate(vendorCoupon);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

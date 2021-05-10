import { Blog } from '../../../src/api/models/Blog';
import { validate } from 'class-validator';

describe('BlogValidations', () => {

    test('Blog should succeed with all required fields', async (done) => {
        // ---
        const blog = new Blog();
        blog.id = 1;
        blog.title = 'test';
        blog.categoryId = 1;
        blog.description = 'test case';
        blog.isActive = 1;
        const errors = await validate(blog);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate Blog without valid id', async (done) => {
        // ---
        const blog = new Blog();
        blog.title = 'test';
        blog.categoryId = 1;
        blog.description = 'test case';
        blog.isActive = 1;
        const errors = await validate(blog);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Blog without valid title', async (done) => {
        // ---
        const blog = new Blog();
        blog.id = 1;
        blog.title = '';
        blog.categoryId = 1;
        blog.description = 'test case';
        blog.isActive = 1;
        const errors = await validate(blog);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Blog without valid category id', async (done) => {
        // ---
        const blog = new Blog();
        blog.id = 1;
        blog.title = 'test';
        blog.description = 'test case';
        blog.isActive = 1;
        const errors = await validate(blog);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Blog without valid description', async (done) => {
        // ---
        const blog = new Blog();
        blog.id = 1;
        blog.title = 'test';
        blog.categoryId = 1;
        blog.description = '';
        blog.isActive = 1;
        const errors = await validate(blog);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate Blog without valid status', async (done) => {
        // ---
        const blog = new Blog();
        blog.id = 1;
        blog.title = 'test';
        blog.categoryId = 1;
        blog.description = 'test case';
        const errors = await validate(blog);
        //
        expect(1).toEqual(errors.length);
        done();
    });
});

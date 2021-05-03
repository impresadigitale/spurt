import { BlogRelated } from '../../../src/api/models/BlogRelated';
import { validate } from 'class-validator';

describe('Blog related Validations', () => {

    test('BlogRelated should succeed with all required fields', async (done) => {
        // ---
        const blogRelated = new BlogRelated();
        blogRelated.relatedId = 1;
        blogRelated.blogId = 1;
        blogRelated.relatedBlogId = 1;
        const errors = await validate(blogRelated);
        //
        expect(0).toEqual(errors.length);
        done();
    });

    test('Should not validate BlogRelated without valid id', async (done) => {
        // ---
        const blogRelated = new BlogRelated();
        blogRelated.blogId = 1;
        blogRelated.relatedBlogId = 1;
        const errors = await validate(blogRelated);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate BlogRelated without valid blog id', async (done) => {
        // ---
        const blogRelated = new BlogRelated();
        blogRelated.relatedId = 1;
        blogRelated.relatedBlogId = 1;
        const errors = await validate(blogRelated);
        //
        expect(1).toEqual(errors.length);
        done();
    });

    test('Should not validate BlogRelated without valid related blog id', async (done) => {
        // ---
        const blogRelated = new BlogRelated();
        blogRelated.blogId = 1;
        blogRelated.relatedId = 1;
        const errors = await validate(blogRelated);
        //
        expect(1).toEqual(errors.length);
        done();
    });

});

export class BlogcountResponseModel {

    public blogcount: any = {};

    constructor(blogcount: any) {
        this.blogcount = blogcount || '';
    }
}

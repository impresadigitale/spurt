import 'reflect-metadata';

export interface AttributeDetails {
    name?: string;
    value?: string;
}

export interface VariantDetails {
    name?: string;
    value?: string;
}

export class ListRequest {

    public limit: number;

    public offset: number;

    public keyword: string;

    public categoryslug: string;

    public priceTo: string;

    public priceFrom: string;

    public manufacturerId: string;

    public price: string;

    public count: number;

    public variant: string;

    public attribute: string;

}

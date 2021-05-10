/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Product } from '../models/ProductModel';
import { ProductRepository } from '../repositories/ProductRepository';
import { Brackets, getConnection, Like } from 'typeorm';
import { ProductVarientOption } from '../models/ProductVarientOption';

@Service()
export class ProductService {
    constructor(
        @OrmRepository() private productRepository: ProductRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // find product
    public find(product: any): Promise<any> {
        return this.productRepository.find(product);
    }

    // find product
    public findAll(): Promise<any> {
        return this.productRepository.find();
    }

    // find one product
    public async findOne(findCondition: any): Promise<any> {
        return await this.productRepository.findOne(findCondition);
    }

    // product list
    public list(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], search: any = [], price: number, count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        if (relation && relation.length > 0) {
            condition.relations = relation;
        }

        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                const operator: string = item.op;
                if (operator === 'where' && item.value !== '') {
                    condition.where[item.name] = item.value;
                } else if (operator === 'like' && item.value !== '') {
                    condition.where[item.name] = Like('%' + item.value + '%');
                }
            });
        }

        if (search && search.length > 0) {
            search.forEach((item: any) => {
                const operator: string = item.op;
                if (operator === 'like' && item.value !== '') {
                    condition.where[item.name] = Like('%' + item.value + '%');
                }
            });
        }

        if (price && price === 1) {
            condition.order = {
                price: 'ASC',
                createdDate: 'DESC',
            };
        } else if (price && price === 2) {
            condition.order = {
                price: 'DESC',
                createdDate: 'DESC',
            };
        } else {
            condition.order = {
                createdDate: 'DESC',
            };
        }

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.productRepository.count(condition);
        }
        return this.productRepository.find(condition);
    }

    // create product
    public async create(product: Product): Promise<Product> {
        const newProduct = await this.productRepository.save(product);
        return newProduct;
    }

    // update product
    public update(id: any, product: Product): Promise<Product> {
        this.log.info('Update a product');
        product.productId = id;
        return this.productRepository.save(product);
    }

    // delete product
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a product');
        const newProduct = await this.productRepository.delete(id);
        return newProduct;
    }

    // query builder product list
    public async productList(limit: number, offset: number, select: any = [], searchConditions: any = [], whereConditions: any = [], categoryId: any = [], priceFrom: string, priceTo: string, price: number, count: number | boolean): Promise<any> {
        return await this.productRepository.productList(limit, offset, select, searchConditions, whereConditions, categoryId, priceFrom, priceTo, price, count);
    }

    // Recent selling product
    public async recentProductSelling(limit: number): Promise<any> {
        return await this.productRepository.recentProductSelling(limit);
    }

    // Maximum Product price
    public async productMaxPrice(maximum: any): Promise<any> {
        return await this.productRepository.productMaxPrice(maximum);
    }

    public async slugData(data: string): Promise<any> {
        return await this.productRepository.productSlug(data);
    }

    public async slug(data: string): Promise<any> {
        return await this.productRepository.productSlugData(data);
    }

    public async findSkuName(productId: number, skuName: string, flag: number): Promise<any> {
        return await this.productRepository.findSkuName(productId, skuName, flag);
    }

    // findSkuForProductVarient
    public async findSkuForProductVarient(productId: number): Promise<any> {
        return await this.productRepository.findSkuForProductVarient(productId);
    }

    public async listByQueryBuilder(
        limit: number,
        offset: number,
        select: any = [],
        whereConditions: any = [],
        searchConditions: any = [],
        relations: any = [],
        groupBy: any = [],
        sort: any = [],
        count: boolean = false,
        rawQuery: boolean = false)
        : Promise<Product[] | number> {

        const query: any = await getConnection().getRepository(Product).createQueryBuilder();
        // Select
        if (select && select.length > 0) {
            query.select(select);
        }
        // Join
        if (relations && relations.length > 0) {
            relations.forEach((joinTb: any) => {
                if (joinTb.op === 'left') {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName);
                } else {
                    query.innerJoin(joinTb.tableName, joinTb.aliasName);
                }
            });
        }
        // Where
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                if (item.op === 'where' && item.sign === undefined) {
                    query.where(item.name + ' = ' + item.value);
                } else if (item.op === 'and' && item.sign === undefined) {
                    query.andWhere(item.name + ' = ' + item.value);
                } else if (item.op === 'and' && item.sign !== undefined) {
                    query.andWhere(' \'' + item.name + '\'' + ' ' + item.sign + ' \'' + item.value + '\'');
                } else if (item.op === 'raw' && item.sign !== undefined) {
                    query.andWhere(item.name + ' ' + item.sign + ' \'' + item.value + '\'');
                } else if (item.op === 'or' && item.sign === undefined) {
                    query.orWhere(item.name + ' = ' + item.value);
                } else if (item.op === 'IN' && item.sign === undefined) {
                    query.andWhere(item.name + ' IN (' + item.value + ')');
                } else if (item.op === 'IS NULL' && item.sign === undefined) {
                    query.orWhere(item.name + 'IS NULL' + item.value);
                } else if (item.op === 'IN' && item.sign === 'variant') {
                    const subQb: any = getConnection()
                        .getRepository(ProductVarientOption)
                        .createQueryBuilder('PVO');
                    subQb.select(['DISTINCT(`PVO`.`product_id`)']);
                    subQb.innerJoin('PVO.productVarientOptionDetail', 'PVOD');
                    subQb.innerJoin('PVOD.varientsValue', 'VV');
                    subQb.innerJoin('VV.varients', 'V');
                    subQb.where('PVO.is_active = ' + 1 + ' ');
                    const val = item.value;
                    val.forEach((data: any, subIndex: number) => {
                        if (subIndex === 0) {
                            subQb.andWhere('LOWER(V.name) = ' + '"' + data.name + '" AND LOWER(VV.value_name) = ' + '"' + data.value + '"');
                            return;
                        }
                        subQb.orWhere('LOWER(V.name) = ' + '"' + data.name + '" AND LOWER(VV.value_name) = ' + '"' + data.value + '"');
                    });
                    query.andWhere(item.name + ' IN (' + subQb.getSql() + ')');
                }
            });
        }
        // Keyword Search
        if (searchConditions && searchConditions.length > 0) {
            searchConditions.forEach((table: any) => {
                if ((table.op === undefined && table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0)) {
                    const namesArray = table.name;
                    namesArray.forEach((name: string, index: number) => {
                        query.andWhere(new Brackets(qb => {
                            const valuesArray = table.value;
                            valuesArray.forEach((value: string | number, subIndex: number) => {
                                if (subIndex === 0) {
                                    qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                    return;
                                }
                                qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                            });
                        }));
                    });
                } else if (table.op === undefined && table.name && table.name instanceof Array && table.name.length > 0) {
                    query.andWhere(new Brackets(qb => {
                        const namesArray = table.name;
                        namesArray.forEach((name: string, index: number) => {
                            if (index === 0) {
                                qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                                return;
                            }
                            qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                        });
                    }));
                } else if (table.op === undefined && table.value && table.value instanceof Array && table.value.length > 0) {
                    query.andWhere(new Brackets(qb => {
                        const valuesArray = table.value;
                        valuesArray.forEach((value: string | number, index: number) => {
                            if (index === 0) {
                                qb.andWhere('LOWER(' + table.name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                return;
                            }
                            qb.orWhere('LOWER(' + table.name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                        });
                    }));
                } else if ((table.op === 'attribute' && table.op !== undefined && table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0)) {
                    const namesArray = table.name;
                    namesArray.forEach((name: string, index: number) => {
                        query.andWhere(new Brackets(qb => {
                            const valuesArray = table.value;
                            valuesArray.forEach((value: any, subIndex: number) => {
                                if (subIndex === 0) {
                                    qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + this.addSlashes(value.name.toLowerCase().trim() + '-' + value.value.toLowerCase().trim()) + '%\'');
                                    return;
                                }
                                qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + this.addSlashes(value.name.toLowerCase().trim() + '-' + value.value.toLowerCase().trim()) + '%\'');
                            });
                        }));
                    });
                }
            });
        }

        // GroupBy
        if (groupBy && groupBy.length > 0) {
            let i = 0;
            groupBy.forEach((item: any) => {
                if (i === 0) {
                    query.groupBy(item.name);
                } else {
                    query.addGroupBy(item.name);
                }
                i++;
            });
        }
        // orderBy
        if (sort && sort.length > 0) {
            sort.forEach((item: any) => {
                query.orderBy('' + item.name + '', '' + item.order + '');
            });
        }
        // Limit & Offset
        if (limit && limit > 0) {
            query.limit(limit);
            query.offset(offset);
        }
        if (!count) {
            if (rawQuery) {
                return query.getRawMany();
            }
            return query.getMany();
        } else {
            return query.getCount();
        }
    }

    public addSlashes(str: string): string {
        return (str + '').replace(/'/g, "''");
    }

    public async checkSlug(slug: string, id: number, count: number = 0): Promise<number> {
        if (count > 0) {
            slug = slug + count;
        }
        return await this.productRepository.checkSlugData(slug, id);
    }

}

/*
 * spurtcommerce API
 * version 4.4
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {BeforeInsert, BeforeUpdate, Column, Entity} from 'typeorm';
import {PrimaryGeneratedColumn} from 'typeorm/index';
import {BaseModel} from '../../api/models/BaseModel';
import moment = require('moment');
@Entity('plugins')
export class Plugins extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'plugin_name' })
    public pluginName: string;

    @Column({ name: 'plugin_avatar' })
    public pluginAvatar: string;

    @Column({ name: 'plugin_avatar_path' })
    public pluginAvatarPath: string;

    @Column({ name: 'plugin_type' })
    public pluginType: string;

    @Column({ name: 'plugin_additional_info' })
    public pluginAdditionalInfo: string;

    @Column({ name: 'plugin_status' })
    public pluginStatus: number;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}

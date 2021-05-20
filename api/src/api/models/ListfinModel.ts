import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity, BeforeUpdate, PrimaryColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment from 'moment';


@Entity('zz_listfin')
export class Listfin extends BaseModel {
    @ PrimaryColumn ( ) 
    @IsNotEmpty()
    FLCODLIS : string ;

    @Column({ name: 'FLCODART' })
    public FLCODART: string;

    @Column({ name: 'FLIMPORTO1' })
    public FLIMOIRTO1: number;

    @Column({ name: 'FLIMPORTO2' })
    public FLIMPORTO2: number;

    @Column({ name: 'FLIMPORTOF' })
    public FLIMPORTOF: number;

    @Column({ name: 'FLNUMRATE' })
    public FLNUMRATE: number;

    @Column({ name: 'FLIMPRATA' })
    public FLIMPRATA: number;

}
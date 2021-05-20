import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity, BeforeUpdate, PrimaryColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment from 'moment';


@Entity('zz_listfin')
export class Anafin extends BaseModel {
    @ PrimaryColumn ( ) 
    @IsNotEmpty()
    FICODICE : string ;

    @Column({ name: 'FIDESCRI' })
    public FIDESCRI: string;
}
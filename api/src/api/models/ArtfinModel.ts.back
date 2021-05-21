import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity, BeforeUpdate, PrimaryColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment from 'moment';


@Entity('zz_artfin')
export class Artfin extends BaseModel {
    @ PrimaryColumn ( ) 
    @IsNotEmpty()
    FPCODART : string ;

    @Column({ name: 'FPCODFIN' })
    public FPCODFIN: string;

    @Column({ name: 'FPDESCRI' })
    public FPDESCRI: string;

    @Column({ name: 'TAEG' })
    public TAEG: number;

    @Column({ name: 'TAN' })
    public TAN: number;

    @Column({ name: 'FPPROV' })
    public FPPROV: number;

    @Column({ name: 'FPSPESE' })
    public FPSPESE: number;

}
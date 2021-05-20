
import 'reflect-metadata';
import {
    Get,
    JsonController,
    Authorized,
    QueryParam,
    Res,
    Body,
    Req,
    Post,
    Param,
    Put, Delete, UploadedFile, BodyParam
} from 'routing-controllers';
import { ArtfinService } from '../services/ArtfinService';
import { ListfinService } from '../services/ListfinService';
import { AnafinService } from '../services/AnafinService';
import { Anafin } from '../models/AnafinModel';
import { Artfin } from '../models/ArtfinModel';
import { Listfin } from '../models/ListfinModel';


@JsonController('/finaziamento')
export class FinController {
    constructor(){

    }

    @Post('/finaziamento/add')
    @Authorized()
    public async addFin(@Body({ validate: true} finaziamento: AddFinRequest, @Res() response: any): Promise<any>){
        const newFin: any = new Finanziamento();
        const saveFin = await this.finService.create(newFin);

        if (saveFin) {
            const successResponse: any = {
                status: 1,
                message: 'Finanziamento creato',
                data: saveFin
            };
            return response.status(200).send(successResponse);
        }
        else {
            const errorResponse: any = {
                status: 0,
                message: 'Finanziamento non creato',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
import { ArtfinRepository } from './../repositories/ArtfinRepository';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Anafin } from '../models/AnafinModel';
import { AnafinRepository } from '../repositories/AnafinRepository';
import { Brackets, getConnection, Like } from 'typeorm';

@Service()
export class AnafinService {
    constructor(
        @OrmRepository() private AnafinRepository: AnafinRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

        // find product
        public find(anafin: any): Promise<any> {
            return this.AnafinRepository.find(anafin);
        }
    
        // find product
        public findAll(): Promise<any> {
            return this.AnafinRepository.find();
        }
    
        // find one product
        public async findOne(findCondition: any): Promise<any> {
            return await this.AnafinRepository.findOne(findCondition);
        }

            // create product
    public async create(anafin: Anafin): Promise<Anafin> {
        const newAnafin = await this.AnafinRepository.save(anafin);
        return newAnafin;
    }

    // update product
    public update(id: string, anafin: Anafin): Promise<Anafin> {
        this.log.info('Aggiorna anagrafica finanziamento');
        anafin.FICODICE = id;
        return this.AnafinRepository.save(anafin);
    }

    // delete product
    public async delete(id: string): Promise<any> {
        this.log.info('Elimina anagrafica finanziamento');
        const newAnafin = await this.AnafinRepository.delete(id);
        return newAnafin;
    }
}
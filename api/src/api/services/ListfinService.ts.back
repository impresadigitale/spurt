import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Listfin } from '../models/ListfinModel';
import { ListfinRepository } from '../repositories/ListfinRepository';
import { Brackets, getConnection, Like } from 'typeorm';

@Service()
export class ListfinService {
    constructor(
        @OrmRepository() private ListfinRepository: ListfinRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

        // find product
        public find(listfin: any): Promise<any> {
            return this.ListfinRepository.find(listfin);
        }
    
        // find product
        public findAll(): Promise<any> {
            return this.ListfinRepository.find();
        }
    
        // find one product
        public async findOne(findCondition: any): Promise<any> {
            return await this.ListfinRepository.findOne(findCondition);
        }

            // create product
    public async create(listfin: Listfin): Promise<Listfin> {
        const newListfin = await this.ListfinRepository.save(listfin);
        return newListfin;    }

    // update product
    public update(id: string, listfin: Listfin): Promise<Listfin> {
        this.log.info('Aggiorna anagrafica finanziamento');
        listfin.FLCODLIS = id;
        return this.ListfinRepository.save(listfin);
    }

    // delete product
    public async delete(id: string): Promise<any> {
        this.log.info('Elimina anagrafica finanziamento');
        const newListfin = await this.ListfinRepository.delete(id);
        return newListfin;
    }
}
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Artfin } from '../models/ArtfinModel';
import { ArtfinRepository } from '../repositories/ArtfinRepository';
import { Brackets, getConnection, Like } from 'typeorm';

@Service()
export class ArtfinService {
    constructor(
        @OrmRepository() private ArtfinRepository: ArtfinRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

        // find product
        public find(artfin: any): Promise<any> {
            return this.ArtfinRepository.find(artfin);
        }
    
        // find product
        public findAll(): Promise<any> {
            return this.ArtfinRepository.find();
        }
    
        // find one product
        public async findOne(findCondition: any): Promise<any> {
            return await this.ArtfinRepository.findOne(findCondition);
        }

            // create product
    public async create(artfin: Artfin): Promise<Artfin> {
        const newArtfin = await this.ArtfinRepository.save(artfin);
        return newArtfin;
    }

    // update product
    public update(id: string, artfin: Artfin): Promise<Artfin> {
        this.log.info('Aggiorna articola finanziamento');
        artfin.FPCODART = id;
        return this.ArtfinRepository.save(artfin);
    }

    // delete product
    public async delete(id: string): Promise<any> {
        this.log.info('Elimina articola finanziamento');
        const newArtfin = await this.ArtfinRepository.delete(id);
        return newArtfin;
    }
}
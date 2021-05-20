import { EntityRepository, Repository } from 'typeorm';
import { Anafin } from '../models/AnafinModel';


@EntityRepository(Anafin)
export class AnafinRepository extends Repository<Anafin> {

}
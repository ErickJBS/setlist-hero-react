import BaseService from './BaseService';

class BandService extends BaseService {
    constructor(){
        super('band');
    }

    async getAll(id){
        return super.getAll({query:'manager', id})
    }
}

export default new BandService();
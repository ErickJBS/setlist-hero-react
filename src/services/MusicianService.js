import BaseService from './BaseService';

class MusicianService extends BaseService{
    constructor(){
        super('musician');
    }

    async getAll(id){
        return super.getAll({query:'band', id})
    }
}

export default new MusicianService();
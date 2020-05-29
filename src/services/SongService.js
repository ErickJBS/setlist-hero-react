import BaseService from './BaseService';

class SongService extends BaseService{
    constructor(){
        super('song');
    }

    async getAll(id){
        return super.getAll({query:'band', id})
    }
}

export default new SongService();
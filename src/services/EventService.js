import BaseService from './BaseService';

class EventService extends BaseService {
    constructor() {
        super('event');
    }

    async eventsByBand(id) {
        return super.getAll({ query: 'band', id })
    }

    async eventsByLED(id) {
        return super.getAll({ query: 'designer', id })
    }
}

export default new EventService();
import axios from 'axios';
import environment from 'environment';

const baseUrl = environment.api;
export default class BaseService {

    constructor(resource) {
        this.resource = resource;
        this.resourceUrl = `${baseUrl}/${this.resource}`;
    }

    async create(obj) {
        try {
            const response = await axios.post(this.resourceUrl, obj);
            return response.data;
        } catch (error) {
            if (error?.response?.status === 500) {
                throw new Error('Something happened');
            } else {
                const { data } = error.response;
                const errors = data?.errors;
                throw errors;
            }
        }
    }

    async getById(id) {
        try {
            const response = await axios.get(`${this.resourceUrl}/${id}`);
            return response.data;
        } catch (error) {
            const { status } = error?.response?.status;
            if (status === 500) {
                throw new Error('Something happened');
            } else if (status === 404 || status === 401) {
                const { data } = error.response;
                const message = data?.errors[0]?.msg;
                throw new Error(message);
            } else {
                const { data } = error.response;
                const errors = data?.errors;
                throw errors;
            }
        }
    }

    async getAll({query,id}) {
        try {
            const response = await axios.get(`${this.resourceUrl}/?${query}=${id}`);
            return response.data;
        } catch (error) {
            if (error?.response?.status === 500) {
                throw new Error('Something happened');
            } else {
                const errors = error?.response?.data?.errors;
                throw errors;
            }
        }
    }

    async update(id, obj) {
        try {
            const response = await axios.put(`${this.resourceUrl}/${id}`, obj);
            return response.data;
        } catch (error) {
            const { status } = error?.response?.status;
            if (status === 500) {
                throw new Error('Something happened');
            } else if (status === 404 || status === 401) {
                const { data } = error.response;
                const message = data?.errors[0]?.msg;
                throw new Error(message);
            } else {
                 
                const errors = error?.response?.data?.errors;
                throw errors;
            }
        }
    }
    
    async delete(id) {
        try {
            await axios.delete(`${this.resourceUrl}/${id}`);
            return 'Deletion succeed';
        } catch (error) {
            const { status } = error?.response?.status;
            if (status === 500) {
                throw new Error('Something happened');
            } else if (status === 404 || status === 401) {
                const { data } = error.response;
                const message = data?.errors[0]?.msg;
                throw new Error(message);
            } else {
                const { data } = error.response;
                const errors = data?.errors;
                throw errors;
            }
        }
    }
}

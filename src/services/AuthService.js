import axios from 'axios';
import environment from 'environment';

const baseUrl = environment.api;

export class AuthService {

    async loginWithSocial(social) {
        const requestUrl = `${baseUrl}/auth/${social}`;
        const response = await axios.get(requestUrl);
        const fetchedUrl = response.request.responseURL;
        console.log(response);
        return fetchedUrl;
    }

    async register(data) {
        try {
            const requestUrl = `${baseUrl}/auth/register`
            const response = await axios.post(requestUrl, data, { headers: { 'content-type': 'application/json' } });
            return response.data;
        } catch (error) {
            if (error?.response?.status === 403) {
                throw new Error('User already registered');
            }
            if (error?.response?.status === 500) {
                throw new Error('Something wrong happened... try again later');
            }
        }
    }
    async login(data) {
        try {
            const requestUrl = `${baseUrl}/auth/email`
            const response = await axios.post(requestUrl, data, { headers: { 'content-type': 'application/json' }, withCredentials:true });
            console.log(response);
            return response.data;
        } catch (error) {
            const message = error?.response?.data?.errors[0]?.msg;
            if (error?.response?.status === 500) {
                throw new Error('Something wrong happened... try again later');
            } else {
                throw new Error(message);
            }
        }
    }
}

export default new AuthService();

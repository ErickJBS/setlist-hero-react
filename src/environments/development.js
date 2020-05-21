import environment from './base';

const host = 'http://localhost:5000';
const env = environment(host);
export default {
    ...env,
    isProduction: false,
    isDevelopment: true,
};

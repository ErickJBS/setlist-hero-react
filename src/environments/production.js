import environment from './base';

const basePath = 'http://www.your-production-api.com';
const env = environment(basePath);

export default {
    ...env,
};

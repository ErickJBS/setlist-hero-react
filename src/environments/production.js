import environment from './base';

const host = '';
const env = environment(host);

export default {
    ...env,
};

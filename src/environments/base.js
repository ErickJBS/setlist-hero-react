const basePath = 'api';

export default (host) => {
    return {
        api: `${host}/${basePath}`,
        isProduction: true,
        isDevelopment: false,
    };
}

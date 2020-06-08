const path = require('path');

module.exports = ({ env, paths }) => {
  return {
    webpack: {
      alias: {
        environment: path.join(__dirname, 'src', 'environments', process.env.CLIENT_ENV)
      }
    },
  };
};

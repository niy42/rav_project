const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
    addWebpackAlias({
        crypto: path.resolve(__dirname, 'node_modules/crypto-browserify')
    })
);
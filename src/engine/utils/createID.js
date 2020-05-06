const uniqueID = require('lodash/uniqueId');

const createID = (name = 'NO-NAME') => `${name}#${uniqueID()}`;

module.exports = createID;

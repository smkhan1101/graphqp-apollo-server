const UserResolver = require('./user');
const taskResolver = require('./task');

module.exports = [
    UserResolver,
    taskResolver
];

const { users, tasks } = require('../constaints');
const User = require('../database/models/user');
module.exports = {

    Query: {
        users: () => users,
        user: (_, { id }) => users.find(user => user.id ===  id)
    },
    Mutation: {
        signup: async (_ , { input }) => {
            try {
                const user = await User.findOne({ email: input.email });
                if (user){
                    throw new Error('email already in use')
                }
            } catch {
                console.log(error);
                throw error;
            }
        }
    },
    User: {
        tasks: ({ id }) => tasks.filter(task => task.userId === id)
    }
}
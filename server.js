const express = require('express');
const { ApolloServer, gql  } =require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');
const {tasks, users} = require('./constaints');

// set env variable
dotEnv.config();

const app = express();

// body parser middleware
app.use(express.json());

const typeDefs = gql `
    type Query {
        greetings: [String!]
        tasks: [Task!]
    }

    type User {
        id: ID!,
        name: String!
        email: String!
        tasks: [Task!]
    }
 
    type Task {
        id: ID!
        name: String!
        completed: Boolean!
        user: User!
    }
`;

const resolvers = {
    Query: {
        greetings: () => null,
        tasks: () => tasks
    },
    Task: {
        user: ({ userId }) => users.find(user => user.id === userId)
    }
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

apolloServer.applyMiddleware({app , paht: '/graphql'});


const PORT = process.env.PORT || 3000;

app.use('/', (req , res , next) => {
    res.send({message: 'Hello'});
})

app.listen(PORT, () => {
    console.log(`server listening on Port: ${PORT}`);
    console.log(`Graphql Endpoints: ${apolloServer.graphqlPath}`);
})
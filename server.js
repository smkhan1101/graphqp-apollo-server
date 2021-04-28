const express = require('express');
const { ApolloServer, gql  } =require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const { connection } = require('./database/util')
// set env variable
dotEnv.config();

const app = express();

// body parser middleware
app.use(express.json());

connection();



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
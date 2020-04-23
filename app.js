const config = require('config');
const mongoose  = require('mongoose');
const usersRoute = require('./routes/user.route');
const iconRoute = require('./routes/icon.route');
const express = require('express');
const app = express();
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql')

if(!config.get('myprivatekey')) {
    console.log('Private key is not defined.')
    process.exit(1)
}

mongoose
    .connect('mongodb+srv://tommy:Qt2abc123@mongo-demo-8r1ga.mongodb.net/node-demo?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    //Error handling on initial connection:
    .catch(error => console.log('Connection to MongoDB Failed...'));

const connection = mongoose.connection;
//Error handling after initial connection:
connection.on('error', console.error.bind(console, 'Connection Error:'))
connection.once('open', () => {console.log('Connected to MongoDB.')})

app.use(express.json());
app.use('/api/users', usersRoute)
app.use('/api/icon', iconRoute)
app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent (name: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return ['Hello', 'World!']
        },
        createEvent: (args) => {
           const eventName = args.name
           return eventName 
        }
    },
    graphiql: true
}))

// const port = process.env.PORT || 3000;
app.listen(3000, () => console.log('Listening to port 3000.'))

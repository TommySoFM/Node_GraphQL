const express = require('express');
const app = express();
const config = require('config');

const mongoose  = require('mongoose');
const usersRoute = require('./routes/user.route');
const iconRoute = require('./routes/icon.route');

const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schema/index')
const graphqlResolver = require('./graphql/resolver/index')
const graphqlAuth = require('./middleware/graphqlAuth')

if(!config.get('myprivatekey')) {
    console.log('Private key is not defined.')
    process.exit(1)
}

// Mongoose Connection
mongoose
    .connect(config.get('MONGO_ATLAS_URI'), { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    // Mongoose Error Handling (on initial connection)
    .catch(error => console.log('Connection to MongoDB Failed...'));
// Mongoose Success,Error Handling (after initial connection)
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'Connection Error:'))
connection.once('open', () => {console.log('Connected to MongoDB.')})

//For Restful JSON API
app.use(express.json());
app.use('/api/users', usersRoute)
app.use('/api/icon', iconRoute)

//For GraphQL
app.use(graphqlAuth)
app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
}))

// const port = process.env.PORT || 3000;
app.listen(3000, () => console.log('Listening to port 3000.'))

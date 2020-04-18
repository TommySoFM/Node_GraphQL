const config = require('config');
const mongoose  = require('mongoose');
const usersRoute = require('./routes/user.route');
const express = require('express');
const app = express();

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

// const port = process.env.PORT || 3000;
app.listen(3000, () => console.log('Listening to port 3000.'))

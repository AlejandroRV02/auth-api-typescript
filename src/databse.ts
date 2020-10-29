import mongoose from 'mongoose'
import config from './config/config'

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose.connect(config.URI, dbOptions);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connection stablished')

})

connection.on('error', err => {
    console.log(err);
    process.exit(0);
})
const mongoose = require('mongoose');

require('dotenv').config();

const conectarDB = async () => {
    try{
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlparser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false
        })
        console.log('DB conectada')
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = conectarDB;
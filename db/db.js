const mongoose = require('mongoose');

const db = async () => {
    try{
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to MongoDB')
        return true
    }catch(err){
        console.log(err)
        return false
    }
}

module.exports = {db}

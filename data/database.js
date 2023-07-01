import mongoose from 'mongoose';

export const connectDB = () =>{
mongoose.connect(process.env.MONGO_URI,{
    dbName:"BackendAPI"
 }).then((c)=> console.log(`database connectd with ${c.connection.host}`))
 .catch((e)=> console.log(e));
};

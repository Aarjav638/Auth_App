import mongoose from "mongoose";
export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection=mongoose.connection;
        connection.on('connected',()=>{
            console.log('mongdb connected succesfully');
        })
        connection.on('error',(error)=>{
            console.log('mongdb connection error,Please check monogDB is running'+error);
            process.exit();
        })
    } catch (error) {
        console.log("something goes wrong");
        console.log(error);
    }
}

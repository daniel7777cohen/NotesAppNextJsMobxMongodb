import mongoose from "mongoose";

const connection = {} as { isConnected: number };

const connectDb = async () => {
  if (connection.isConnected) {
    return;
  }

  console.log("mongoURI " + process.env.mongoURI);
  const db = await mongoose.connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected);
};

export default connectDb;

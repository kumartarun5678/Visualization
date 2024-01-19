import mongoose from "mongoose";
const RegitrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    country: String,
    image: String,
    address: String,
    position: String,
  });
  
  const Registration = mongoose.model('Registration', RegitrationSchema);

  export default Registration;  
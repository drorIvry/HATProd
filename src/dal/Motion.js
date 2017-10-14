import mongoose from 'mongoose';


export default mongoose.model('summery', mongoose.Schema({
  avatar:String,
  title:String,
  subtitle:String,
  voted:[String],
  value:String,
}));

import mongoose from 'mongoose';


export default mongoose.model('buckets', mongoose.Schema({
  name:String,
  links:[String],
  description:String,
  state:String,
  address:String,
  tags:[String]
}));

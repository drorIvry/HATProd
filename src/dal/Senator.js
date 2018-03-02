import mongoose from 'mongoose';


export default mongoose.model('senators', mongoose.Schema({
  username: String,
  password: String,
  pledged: Boolean,
}));

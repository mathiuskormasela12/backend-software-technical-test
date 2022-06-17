// ========= Users
// import all modules
import { Schema, model } from 'mongoose';

const users = new Schema({
  username: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  alreadyLoggedIn: {
    type: Boolean,
    required: true,
  },
});

export default model('User', users);

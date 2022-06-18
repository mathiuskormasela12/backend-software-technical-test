// ========= Active Rooms Model
// import all modules
import { Schema, model } from 'mongoose';

const activeRooms = new Schema({
  idRoom: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  alreadyLoggedIn: {
    type: Boolean,
    required: true,
  },
});

export default model('ActiveRoom', activeRooms);

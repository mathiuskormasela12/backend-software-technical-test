// ========= Rooms Model
// import all modules
import { Schema, model } from 'mongoose';

const rooms = new Schema({
  roomId: {
    type: String,
    required: true,
  },
});

export default model('Room', rooms);

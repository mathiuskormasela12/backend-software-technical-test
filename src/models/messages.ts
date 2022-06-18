// ========= Messages Model
// import all modules
import { Schema, model } from 'mongoose';

const cars = new Schema({
  activeRoomId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export default model('Message', cars);

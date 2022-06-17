// ========= Messages Model
// import all modules
import { Schema, model } from 'mongoose';

const cars = new Schema({
  senderName: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export default model('Message', cars);

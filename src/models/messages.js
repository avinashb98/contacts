const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
  recipient: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  lastUpdateAt: {
    type: Date,
    default: Date.now
  }
});

MessageSchema.post('save', () => {
  const data = this;
  data.lastUpdateAt = new Date();
});

module.exports = mongoose.model('Message', MessageSchema);

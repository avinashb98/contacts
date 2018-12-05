const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContactSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  phone: {
    dialCode: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      required: true
    }
  },
  lastUpdateAt: {
    type: Date,
    default: Date.now
  }
});

ContactSchema.post('save', () => {
  const data = this;
  data.lastUpdateAt = new Date();
});

module.exports = mongoose.model('Contact', ContactSchema);

const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: [true, 'Please enter a username'] },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
    },
    balance: {
      type: Number,
      default: '100000',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);

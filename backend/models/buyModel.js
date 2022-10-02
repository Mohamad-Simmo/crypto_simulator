const mongoose = require('mongoose');

const buySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    coinId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    buyPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Buy', buySchema);

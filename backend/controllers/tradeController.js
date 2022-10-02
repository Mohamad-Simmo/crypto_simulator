const asyncHandler = require('express-async-handler');
const Buy = require('../models/buyModel');
const User = require('../models/userModel');

const getBuys = asyncHandler(async (req, res) => {
  const buys = await Buy.find({ userId: req.user.id });
  res.status(200).json(buys);
});

const buy = asyncHandler(async (req, res) => {
  if (!req.body.coinId || !req.body.amount || !req.body.buyPrice) {
    res.status(400);
    throw new Error('Invalid request');
  }

  const { coinId, amount, buyPrice } = req.body;

  const user = await User.findById(req.user.id);
  const { balance } = user;
  if (buyPrice > balance) {
    res.status(400);
    throw new Error('Insufficient balance');
  }

  user.balance = balance - buyPrice;
  await user.save();

  const isBought = await Buy.findOne({ userId: req.user.id, coinId });
  if (isBought) {
    isBought.amount = parseFloat(isBought.amount) + parseFloat(amount);
    isBought.buyPrice = parseFloat(isBought.buyPrice) + parseFloat(buyPrice);
    await isBought.save();
    res.status(200).json(isBought);
  } else {
    const buy = await Buy.create({
      userId: req.user.id,
      coinId,
      amount,
      buyPrice,
    });

    res.status(200).json(buy);
  }
});

const sell = asyncHandler(async (req, res) => {
  if (!req.body.coinId || !req.body.sellPrice) {
    res.status(400);
    throw new Error('Invalid request');
  }
  const { coinId, sellPrice } = req.body;

  const sell = await Buy.findOneAndDelete({ userId: req.user.id, coinId });
  const user = await User.findById(req.user.id);
  user.balance = parseFloat(user.balance) + parseFloat(sellPrice);
  user.save();
  res.send(200).json(sell);
});

module.exports = {
  getBuys,
  buy,
  sell,
};

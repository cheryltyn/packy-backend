const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    expiryDate: {
      type: Date,
      required: true
    },
    numberOfSessionsLeft: {
      type: Number,
      required: true
    },
    numberOfSessionsTotal: {
        type: Number,
        required: true
      },
    type: {
      type: String,
      required: true,
      enum: ['Fitness', 'Beauty', 'Others'] // This ensures the value is one of the specified options
    }
  });
  
  const Package = mongoose.model('Package', packageSchema);
  
  module.exports = Package;
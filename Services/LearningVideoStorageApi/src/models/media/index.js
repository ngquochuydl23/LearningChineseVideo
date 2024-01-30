const mongoose = require('mongoose');
const schemeConstants = require('./schemeConstant');
const { BaseSchema } = require('../share.model');

const MediaSchema = BaseSchema(schemeConstants.Collection, {
  fileName: { type: String },
  mime: { type: String },
  size: { type: Number },
  fileId: {
    required: true,
    type: String,
  }
})

MediaSchema.index({ fileName: 1 }, { unique: true })

module.exports = mongoose.model(schemeConstants.Model, MediaSchema);
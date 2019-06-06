// src / models / CardActions.js
'use strict'

const mongoose = require('mongoose')

// Card Collection
let CardSchema = mongoose.Schema({
  question: String,
  answer: String,
  level: Number,
  updateAt: Date,
  categoryId: String,
  isActive: Boolean,
  userId: String,
  createdAt: Date
})

let Card = mongoose.model('cards', CardSchema)

module.exports = Card

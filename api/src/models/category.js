// src / models / CategoryActions.js
'use strict'

const mongoose = require('mongoose')

// Category Collection
let CategorySchema = mongoose.Schema({
  title: String,
  isActive: Boolean,
  userId: String,
  createdAt: Date
})

let Category = mongoose.model('categories', CategorySchema)

module.exports = Category

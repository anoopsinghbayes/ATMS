'use strict';Object.defineProperty(exports, "__esModule", { value: true });var mongoose = require('mongoose');

var quizSchema = mongoose.Schema({
    message: String,
    createdAt: mongoose.Schema.Types.Date,
    updatedAt: mongoose.Schema.Types.Date });


var customerSchema = exports.customerSchema = mongoose.Schema({
    createdAt: mongoose.Schema.Types.Date,
    updatedAt: mongoose.Schema.Types.Date,
    firstName: String,
    lastName: String,
    email: String,
    quiz: [quizSchema],
    subscription: {
        status: String,
        plan: String,
        products: Array } });
//# sourceMappingURL=quiz.js.map
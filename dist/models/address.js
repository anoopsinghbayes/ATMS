'use strict';Object.defineProperty(exports, "__esModule", { value: true });var mongoose = require('mongoose');

var Schema = mongoose.Schema;



var AddressSchema = new Schema({

    adL1: {
        type: String,

        trim: true },


    street: {
        type: String,
        trim: true },

    city: {
        type: String,
        trim: true },


    state: {
        type: String },

    pin: {
        type: Number },


    phM1: {
        type: String },


    phM2: {
        type: String },


    phL: {
        type: String },


    email: {
        type: String,
        trim: true },

    user: {
        type: String } });



var AddresSchema = exports.AddresSchema = AddressSchema;
//mongoose.mtModel('Address',AddressSchema);
//# sourceMappingURL=address.js.map
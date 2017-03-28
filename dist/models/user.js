'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.User = undefined;var _mongoose = require('mongoose');var _mongoose2 = _interopRequireDefault(_mongoose);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var UserSchema = new _mongoose2.default.Schema({
  name: {
    type: String,
    // field description
    description: 'the full name of the user' },

  hiddenField: {
    type: Date,
    default: Date.now,
    // the field is hidden, not available in GraphQL
    hidden: true },

  age: {
    type: Number,
    indexed: true },

  friends: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'User' }] });


var User = exports.User = _mongoose2.default.model('User', UserSchema);
//# sourceMappingURL=user.js.map
'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.addressType = undefined;var _mtgql = require('../mtgql');var _mtgql2 = _interopRequireDefault(_mtgql);

var _quiz = require('../models/quiz');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var configs = {
              name: 'customerType',
              description: 'Sam schema',
              class: 'GraphQLObjectType',
              schema: _quiz.customerSchema,
              exclude: ['_id'] }; //import MTGQL from 'mongoose-schema-to-graphql';


var addressType = exports.addressType = (0, _mtgql2.default)(configs);
console.log(addressType);
//# sourceMappingURL=graphqlType.js.map
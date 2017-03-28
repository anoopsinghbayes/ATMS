'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.addressType = undefined;
var _mongooseSchemaToGraphql = require('mongoose-schema-to-graphql');var _mongooseSchemaToGraphql2 = _interopRequireDefault(_mongooseSchemaToGraphql);
var _quiz = require('../models/quiz');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //import MTGQL from '../mtgql';

var configs = {
              name: 'customerType',
              description: 'Sam schema',
              class: 'GraphQLObjectType',
              schema: _quiz.customerSchema,
              exclude: ['_id'] };


var addressType = exports.addressType = (0, _mongooseSchemaToGraphql2.default)(configs);
//# sourceMappingURL=graphqlType.js.map
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _graphqlTools = require('graphql-tools');
var _graphqlType = require('./graphqlType');
var _graffitiMongoose = require('@risingstack/graffiti-mongoose');
var _user = require('../models/user');
var _graphql = require('graphql');







var _resolvers = require('./resolvers');var _resolvers2 = _interopRequireDefault(_resolvers);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// Construct a schema, using GraphQL schema language
var videoFields = {

  id: {
    type: _graphql.GraphQLID,
    description: 'The id of the video.' },

  title: {
    type: _graphql.GraphQLString,
    description: 'The title of the video.' },

  duration: {
    type: _graphql.GraphQLInt,
    description: 'The duration of the video (in seconds).' },

  watched: {
    type: _graphql.GraphQLBoolean,
    description: 'Whether or not the viewer has watched the video.' } };



var videoType = new _graphql.GraphQLObjectType({
  name: 'Video',
  description: 'A video on Egghead.io',
  fields: _extends({}, videoFields) });

var queryType = new _graphql.GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type.',
  fields: {


    video: {
      type: videoType,
      args: _extends({}, videoFields),

      resolve: function resolve() {return new Promise(function (resolve) {
          resolve({
            id: 'a',
            title: 'GraphQL',
            duration: 180,
            watched: false });

        });} } } });



console.log(_graphqlType.addressType);
var S = new _graphql.GraphQLSchema({
  query: videoType });

// const schema = `
// type Author {
//   id: Int! # the ! means that every author object _must_ have an id
//   firstName: String
//   lastName: String
//   posts: [Post] # the list of Posts by this author
// }

// type Post {
//   id: Int!
//   title: String
//   author: Author
//   votes: Int
// }

// # the schema allows the following query:
// type Query {
//   author(firstName:String,lastName:String):[Author]
// }

// # this schema allows the following mutation:
// type Mutation {
//   upvotePost (
//     postId: Int!
//   ): Post
// }

// type Subscription {
//   postUpvoted: Post
// }

// `;
var options = {
  mutation: true, // mutation fields can be disabled
  allowMongoIDMutation: false // mutation of mongo _id can be enabled
};

var schema = (0, _graffitiMongoose.getSchema)([_user.User], options);exports.default =
schema;

console.log(S);
// makeExecutableSchema({
//   typeDefs: S
// });
//# sourceMappingURL=schema.js.map
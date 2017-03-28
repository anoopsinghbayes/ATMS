'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _graphqlTools = require('graphql-tools');
var _graphqlType = require('./graphqlType');
var _user = require('../models/user');
var _graphql = require('graphql');







var _resolvers = require('./resolvers');var _resolvers2 = _interopRequireDefault(_resolvers);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// Construct a schema, using GraphQL schema language
// const videoFields={

//     id: {
//       type: GraphQLID,
//       description: 'The id of the video.'
//     },  
//     title: {
//       type: GraphQLString,
//       description: 'The title of the video.',
//     },
//     duration: {
//       type: GraphQLInt,
//       description: 'The duration of the video (in seconds).',
//     },
//     watched: {
//       type: GraphQLBoolean,
//       description: 'Whether or not the viewer has watched the video.'
//     },

// };
// const videoType = new GraphQLObjectType({
//   name: 'Video',
//   description: 'A video on Egghead.io',
//   fields: {...videoFields},
// });
// const queryType = new GraphQLObjectType({
//   name: 'QueryType',
//   description: 'The root query type.',
//   fields: {


//     video: {
//       type: videoType,
//       args:{...videoFields},

//       resolve: () => new Promise((resolve) => {
//         resolve({
//           id: 'a',
//           title: 'GraphQL',
//           duration: 180,
//           watched: false
//         });
//       }),
//     },
//   },
// });
// const S=new GraphQLSchema({
//   query:videoType
// })
var schemaDef = '\ntype Author {\n  _id: String! # the ! means that every author object _must_ have an id\n  name: String\n  posts: [Post] # the list of Posts by this author\n}\n\ntype Post {\n  _id: String!\n  title: String\n  author: Author\n  votes: Int\n}\n\n# the schema allows the following query:\ntype Query {\n  author(name:String):[Author]\n  posts(_id:String,title:String):[Post]\n}\n\n# this schema allows the following mutation:\ntype Mutation {\n  upvotePost (\n    postId: String!\n  ): Post\n}\n\n';exports.default =




























(0, _graphqlTools.makeExecutableSchema)({
  typeDefs: schemaDef,
  resolvers: _resolvers2.default });
//# sourceMappingURL=schema.js.map
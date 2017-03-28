import { makeExecutableSchema,buildSchema } from 'graphql-tools';
import { addressType } from './graphqlType';
import {User} from '../models/user'
import {  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString ,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLObject
} from 'graphql' 
import resolvers from './resolvers';

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
const schemaDef = `
type Author {
  _id: String! # the ! means that every author object _must_ have an id
  name: String
  posts: [Post] # the list of Posts by this author
}

type Post {
  _id: String!
  title: String
  author: Author
  votes: Int
}

# the schema allows the following query:
type Query {
  author(name:String):[Author]
  posts(_id:String,title:String):[Post]
}

# this schema allows the following mutation:
type Mutation {
  upvotePost (
    postId: String!
  ): Post
}

`;

export default makeExecutableSchema({
  typeDefs: schemaDef,
  resolvers:resolvers
});

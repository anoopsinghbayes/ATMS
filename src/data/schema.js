import { makeExecutableSchema,buildSchema } from 'graphql-tools';
import { addressType } from './graphqlType';
import {getSchema} from '@risingstack/graffiti-mongoose';
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
const videoFields={
  
    id: {
      type: GraphQLID,
      description: 'The id of the video.'
    },  
    title: {
      type: GraphQLString,
      description: 'The title of the video.',
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the video (in seconds).',
    },
    watched: {
      type: GraphQLBoolean,
      description: 'Whether or not the viewer has watched the video.'
    },
  
};
const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'A video on Egghead.io',
  fields: {...videoFields},
});
const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type.',
  fields: {

  
    video: {
      type: videoType,
      args:{...videoFields},

      resolve: () => new Promise((resolve) => {
        resolve({
          id: 'a',
          title: 'GraphQL',
          duration: 180,
          watched: false
        });
      }),
    },
  },
});
console.log(addressType);
const S=new GraphQLSchema({
  query:videoType
})
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
const options = {
  mutation: true, // mutation fields can be disabled
  allowMongoIDMutation: false // mutation of mongo _id can be enabled
};

const schema = getSchema([User], options);
export default schema;

console.log(S);
// makeExecutableSchema({
//   typeDefs: S
// });

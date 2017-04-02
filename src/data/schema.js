import { makeExecutableSchema,buildSchema } from 'graphql-tools';
import {  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString ,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLObject
} from 'graphql' 
import resolvers from './resolvers';
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

import { find, filter } from 'lodash';
import {Post,Author} from '../data/mongoose-test-data';

const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
];

const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'GraphQL Rocks', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
];

const resolveFunctions = {
  Query: {
    posts(_,args) {
      return Post.find();
    },
    author(_, args) {
      return Author.find()
      //post.populate('author').exec();
    },
  },
  Author: {
    _id(author){
      return author._id;
    },
    name(author){
      return author.name;
    },
    posts(author) {
     return author.lazyPopulate('post');
    },
  },
  Post: {
    author(post) {
    return post.lazyPopulate('author');
     // return find(authors, { id: post.authorId });
    },
  },
};

export default resolveFunctions;

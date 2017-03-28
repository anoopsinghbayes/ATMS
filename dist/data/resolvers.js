'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _lodash = require('lodash');
var _mongooseTestData = require('../data/mongoose-test-data');

var authors = [
{ id: 1, firstName: 'Tom', lastName: 'Coleman' },
{ id: 2, firstName: 'Sashko', lastName: 'Stubailo' }];


var posts = [
{ id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
{ id: 2, authorId: 2, title: 'GraphQL Rocks', votes: 3 },
{ id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 }];


var resolveFunctions = {
  Query: {
    posts: function posts(_, args) {
      return _mongooseTestData.Post.find();
    },
    author: function author(_, args) {
      return _mongooseTestData.Author.find();
      //post.populate('author').exec();
    } },

  Author: {
    _id: function _id(author) {
      return author._id;
    },
    name: function name(author) {
      return author.name;
    },
    posts: function posts(author) {
      return author.lazyPopulate('post');
    } },

  Post: {
    author: function author(post) {
      return post.lazyPopulate('author');
      // return find(authors, { id: post.authorId });
    } } };exports.default =



resolveFunctions;
//# sourceMappingURL=resolvers.js.map
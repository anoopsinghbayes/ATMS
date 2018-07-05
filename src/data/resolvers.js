import { find, filter } from "lodash";
import { Post, Author } from "../data/mongoose-test-data";
import graphqlFields from "graphql-fields";
const Dataloader = require("dataloader");

const PopulateOnPost = cols => {
  // console.log("all cols", cols);
  return Promise.resolve(Post.find());
};

function selectionAndProjection(model) {
  var props = Object.keys(model.schema.paths);
}
function getProjection(fields) {
  let a = graphqlFields(fields);
  const topLevelFields = Object.keys(graphqlFields(fields));
  return topLevelFields.join(" ");
  // return topLevelFields.reduce((projections, selection) => {

  //   projections[selection] = 1;

  //   return projections;
  // }, {});
}

const PopulatePost = new Dataloader(PopulateOnPost);
const resolveFunctions = {
  Query: {
    posts(_, args, context, fields) {
      //  console.log(JSON.stringify(graphqlFields(fields), null, 2));
      const projection = getProjection(fields);
      console.log("root post projection");
      Post.find();
      return Post.find()
        .pop(projection)
        .then((err, doc) => {
          console.log(doc);
        });
      //PopulatePost.load("args");
    },
    author(_, args) {
      return Author.find();
      //post.populate('author').exec();
    }
  },
  Author: {
    _id(author) {
      return author._id;
    },
    name(author) {
      return author.name;
    },
    posts(author) {
      const topLevelFields = Object.keys(graphqlFields(fields));
      return author
        .populate("post")
        .execPopulate()
        .then(author => {
          return author.post;
        });
      //return author.lazyPopulate('post');
    }
  },
  Post: {
    title(post, args, ctx, fields) {
      console.log("Posts projection", getProjection(fields));
      return post.title;
      //return PopulatePost.load('title');
    },
    author(post, args, ctx, fields) {
      const topLevelFields = Object.keys(graphqlFields(fields));

      return PopulatePost.load("author");
      //post.populate('author').execPopulate().then((post)=>{
      //      return post.author;
      // });
    }
  }
};

export default resolveFunctions;

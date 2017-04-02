
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
var LazyPopulate = require('./plugin');
//var db = mongoose.connect("mongodb://localhost:27017/test");

let AuthorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    post: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }]
})


let postSchema = new Schema({
    title: {
        type: String,
        required: true

    },

    author: [{
        type: Schema.Types.ObjectId,
        ref: "Author"

    }]
});
postSchema.plugin(LazyPopulate,mongoose);
AuthorSchema.plugin(LazyPopulate,mongoose);
let Author = mongoose.model('Author', AuthorSchema);
let Post = mongoose.model('Post', postSchema);
console.log("plugin method",Post.lazyPopulate)

//Post.remove({});
//Author.remove({});
export {Author, Post }
let authordata = { name: "Anoop" }

let postdata = { title: "1 this is second post" };

// let author = new Author(authordata);
// let post=new Post(postdata);
//     author.save(() => {
//         postdata.author=author;
//         post=new Post(postdata);
//         post.save(()=>{
//             author.post=post._id;
//              author.save().then((auth)=>{
//                  console.log(auth);
//              });
//         })
//     });

// let args={}

// let query={title:"2 this is second post",_id:'58d8619b86cf8d747dcb1c13'}
// let args2={};
var p=Author.findOne({_id:"58e013bb4ff5f13e79362304"});

p.then((P) => {
   // console.log("P",P);
    P.populate('post').execPopulate().then((D)=>{
        console.log('post',D,4)
    })
});

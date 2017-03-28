
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
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    }
})


let postSchema = new Schema({
    title: {
        type: String,
        required: true

    },

    author: {
        type: Schema.Types.ObjectId,
        ref: "Author"

    }
});
postSchema.plugin(LazyPopulate,mongoose);
AuthorSchema.plugin(LazyPopulate,mongoose);
let Author = mongoose.model('Author', AuthorSchema);
let Post = mongoose.model('Post', postSchema);
console.log("plugin method",Post.lazyPopulate)



export {Author, Post }
// let authordata = { name: "jam" }

// let postdata = { title: "2 this is second post" };

// let author = new Author(authordata);
//     author.save(() => {
//         postdata.author=author._id;
//         post=new Post(postdata);
//         post.save(()=>{
//             console.log("author",author);
//             console.log("post",post);
//         })
//     });

let args={}
let query={title:"2 this is second post",_id:'58d8619b86cf8d747dcb1c13'}
let args2={};
var p=Post.findOne({title:"2 this is second post"});

p.then((P) => {
   // console.log("P",P);
    P.populate('author').execPopulate().then((D)=>{
        console.log('post',D,4)
    })
});

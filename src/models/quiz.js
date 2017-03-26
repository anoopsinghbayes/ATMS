var mongoose =require('mongoose');

let quizSchema = mongoose.Schema({
    message: String,
    createdAt: mongoose.Schema.Types.Date,
    updatedAt: mongoose.Schema.Types.Date
});

export let customerSchema = mongoose.Schema({
    createdAt: mongoose.Schema.Types.Date,
    updatedAt: mongoose.Schema.Types.Date,
    firstName: String,
    lastName: String,
    email: String,
    quiz: [quizSchema],
    subscription: {
        status: String,
        plan: String,
        products: Array
    }
});

import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { schemaComposer } from "graphql-compose";
mongoose.connect("mongodb://localhost:27017/ATMS");
// STEP 1: DEFINE MONGOOSE SCHEMA AND MODEL
const LanguagesSchema = new mongoose.Schema({
  language: String,
  skill: {
    type: String,
    enum: ["basic", "fluent", "native"]
  }
});

const UserSchema = new mongoose.Schema({
  name: String, // standard types
  age: {
    description: "age of user",
    type: Number,
    index: true
  },
  languages: {
    type: [LanguagesSchema], // you may include other schemas (here included as array of embedded documents)
    default: []
  },
  contacts: {
    // another mongoose way for providing embedded documents
    email: String,
    phones: [String] // array of strings
  },
  gender: {
    // enum field with values
    type: String,
    enum: ["male", "female", "ladyboy"]
  },
  someMixed: {
    type: mongoose.Schema.Types.Mixed,
    description:
      "Can be any mixed type, that will be treated as JSON GraphQL Scalar Type"
  }
});
const User = mongoose.model("User", UserSchema);

// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const customizationOptions = {}; // left it empty for simplicity, described below
const UserTC = composeWithMongoose(User, customizationOptions);

// STEP 3: CREATE CRAZY GraphQL SCHEMA WITH ALL CRUD USER OPERATIONS
// via graphql-compose it will be much much easier, with less typing
schemaComposer.rootQuery().addFields({
  userById: UserTC.getResolver("findById"),
  userByIds: UserTC.getResolver("findByIds"),
  userOne: UserTC.getResolver("findOne"),
  userMany: UserTC.getResolver("findMany"),
  userCount: UserTC.getResolver("count"),
  userConnection: UserTC.getResolver("connection"),
  userPagination: UserTC.getResolver("pagination")
});

schemaComposer.rootMutation().addFields({
  userCreate: UserTC.getResolver("createOne"),
  userUpdateById: UserTC.getResolver("updateById"),
  userUpdateOne: UserTC.getResolver("updateOne"),
  userUpdateMany: UserTC.getResolver("updateMany"),
  userRemoveById: UserTC.getResolver("removeById"),
  userRemoveOne: UserTC.getResolver("removeOne"),
  userRemoveMany: UserTC.getResolver("removeMany")
});

const graphqlSchema = schemaComposer.buildSchema();
export default graphqlSchema;

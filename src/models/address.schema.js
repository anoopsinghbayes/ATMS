import { makeExecutableSchema, buildSchema } from 'graphql-tools';
import resolvers from './address.resolver';
import { Address, BusinessPartner, CustomerSchema, Customer, Vendor, Employee } from '../models'
import mongoose, { Schema } from 'mongoose';
mongoose.set('debug', true)
import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLObject
} from 'graphql';
import { composeWithMongoose, convertSchemaToGraphQL } from 'graphql-compose-mongoose';
import { findMany } from '../../node_modules/graphql-compose-mongoose/lib/resolvers';
import { GQC } from 'graphql-compose';
// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const customizationOptions = {}; // left it empty for simplicity, described below
const AddressTC = composeWithMongoose(Address);
const CustomerTC = composeWithMongoose(Customer);
const VendorTC = composeWithMongoose(Vendor);
const EmployeeTC = composeWithMongoose(Employee);
const BusinessPartnerTC = composeWithMongoose(BusinessPartner);
const ff = findMany(Customer, CustomerTC)
CustomerTC.addRelation(
    'acc',
    () => ({
        resolver: AddressTC.getResolver('findByIds'),
        args: { // resolver `findByIds` has `_ids` arg, let provide value to it
            _ids: (source) => source.address,
        },
        projection: { address: 1 }, // point fields in source object, which should be fetched from DB
    })
);

function getNewResolver(context, resolverName) {
    console.log("DB", context.db);
    let newCustomerModel = mongoose.model("Customer", CustomerSchema);
    let newCustomerModelCT = composeWithMongoose(newCustomerModel)
    return newCustomerModelCT.getResolver(resolverName).resolve;
}

GQC.rootQuery().addFields({
    customer: CustomerTC.getResolver('findById'),
    customers: CustomerTC.getResolver('findMany').wrapResolve(next => rp => {
        let resolve = getNewResolver(rp.context, "findMany");
        const resultPromise = resolve(rp);
        return resultPromise; // return payload promise to upper wrapper
    }),
    address: AddressTC.getResolver('findMany'),
    vendor: VendorTC.getResolver('findMany'),
    employee: EmployeeTC.getResolver('findMany'),
    businessPartner: BusinessPartnerTC.getResolver('findMany'),

});
GQC.rootMutation().addFields({
    customer: CustomerTC.getResolver('createOne'),
    address: AddressTC.getResolver('createOne'),
    vendor: VendorTC.getResolver('createOne'),
    employee: EmployeeTC.getResolver('createOne'),
    businessPartner: BusinessPartnerTC.getResolver('createOne'),
});
const S = GQC.buildSchema();
const schemaDef = `

type Address{
    _id:String
    adl1:String
    adl2:String
}
input NewAddress{
    adl1:String
    adl2:String
}
type Query{
    address:Address
}
type Mutation {
  addAddress (address:NewAddress): Address
}
`
export default S;
// export default makeExecutableSchema({
//     typeDefs: schemaDef,
//     resolvers: resolvers
// });
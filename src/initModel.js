// Somewhere else
import { SchemaComposer, schemaComposer } from "graphql-compose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { AddressSchema, BusinessPartnerSchema } from "./models";
const createModels = conn => {
  let AddressModel = conn.model("Address", AddressSchema);
  let BusinessPartnerModel = conn.model(
    "BusinessPartner",
    BusinessPartnerSchema
  );
  return {
    address: AddressModel,
    businessPartner: BusinessPartnerModel
  };
};
const createGQLSchema = models => {
  // schemaComposer.clear();
  const GQC = new SchemaComposer();
  const AddressTC = composeWithMongoose(models.address, GQC);
  GQC.clear();
  const BusinessPartnerTC = composeWithMongoose(models.businessPartner, GQC);

  BusinessPartnerTC.addRelation("address", {
    resolver: () => AddressTC.getResolver("findByIds"),
    prepareArgs: {
      _ids: source => source.addressIds
    },
    projection: { addressIds: 1 }
  });
  GQC.rootQuery().addFields({
    address: AddressTC.getResolver("findMany"),
    BusinessPartner: BusinessPartnerTC.getResolver("findMany"),
    addressPagination: AddressTC.getResolver("pagination")
  });
  GQC.rootMutation().addFields({
    address: AddressTC.getResolver("createOne"),
    BusinessPartner: BusinessPartnerTC.getResolver("createOne")
  });
  const graphqlSchema = GQC.buildSchema();
  return graphqlSchema;
};
export { createModels, createGQLSchema };

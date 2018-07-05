// Somewhere else
import { SchemaComposer, GQC } from "graphql-compose";
import composeWithMongoose from "graphql-compose-mongoose";
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
  const GQC = new SchemaComposer(); // Don't want to reuse the GQC storage - this allows creating a new one.
  const addressTC = composeWithMongoose(models.address);
  const BusinessPartnerTC = composeWithMongoose(models.businessPartner);
  GQC.rootQuery().addFields({
    address: addressTC.get("$findMany"),
    BusinessPartner: BusinessPartnerTC.get("$findMany")
  });
  GQC.rootMutation().addFields({
    address: addressTC.getResolver("createOne")
  });
  const graphqlSchema = GQC.buildSchema();
  return graphqlSchema;
};
export { createModels, createGQLSchema };

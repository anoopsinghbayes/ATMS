// Somewhere else
import { SchemaComposer, schemaComposer, TypeStorage } from "graphql-compose";
import {
  composeWithMongoose,
  convertSchemaToGraphQL
} from "graphql-compose-mongoose/node8";
import {
  AddressSchema,
  BusinessPartnerSchema,
  CustomerSchema,
  EmployeeSchema
} from "./models";

const createModels = conn => {
  let AddressModel = conn.model("Address", AddressSchema);
  let BusinessPartnerModel = conn.model(
    "BusinessPartner",
    BusinessPartnerSchema
  );
  let customerModel = BusinessPartnerModel.discriminator(
    "Customer",
    CustomerSchema
  );
  let employeeModel = BusinessPartnerModel.discriminator(
    "Employee",
    EmployeeSchema
  );
  return {
    address: AddressModel,
    businessPartner: BusinessPartnerModel,
    customer: customerModel,
    employee: employeeModel
  };
};
const createGQLSchema = models => {
  //how to clear typestorage as in earlier version
  schemaComposer.clear();
  const AddressTC = composeWithMongoose(models.address, {});
  const BusinessPartnerTC = composeWithMongoose(models.businessPartner, {});
  const customerTC = composeWithMongoose(models.customer, {});
  const employeeTC = composeWithMongoose(models.employee, {});

  customerTC.addRelation("address", {
    resolver: () => AddressTC.getResolver("findByIds"),
    prepareArgs: {
      _ids: source => source.addressIds
    },
    projection: { addressIds: 1 }
  });
  employeeTC.addRelation("address", {
    resolver: () => AddressTC.getResolver("findByIds"),
    prepareArgs: {
      _ids: source => source.addressIds
    },
    projection: { addressIds: 1 }
  });
  schemaComposer.rootQuery().addFields({
    address: AddressTC.getResolver("findMany"),
    Customer: customerTC.getResolver("findMany"),
    employee: employeeTC.getResolver("findMany"),
    employeePagination: employeeTC.getResolver("pagination")
  });
  schemaComposer.rootMutation().addFields({
    address: AddressTC.getResolver("createOne"),
    Customer: customerTC.getResolver("createOne"),
    Employee: employeeTC.getResolver("createOne")
  });
  const graphqlSchema = schemaComposer.buildSchema();
  return graphqlSchema;
};
export { createModels, createGQLSchema };

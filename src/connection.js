import mongoose from "mongoose";
import { createModels, createGQLSchema } from "./initModel";
const mainDB = mongoose.createConnection("mongodb://localhost:27017/ATMS");

const tenantsConfig = [
  { name: "t2", db: "t2", connStr: `mongodb://localhost:27017/t2` },
  { name: "t1", db: "t1", connStr: `mongodb://localhost:27017/t1` }
];

let tenantConns = tenantsConfig.map(config => ({
  ...config,
  conn: mainDB.useDb(config.db)
}));
// console.log("tenantConns", tenantConns);
let tenantModels = tenantConns.map(model => ({
  ...model,
  models: createModels(model.conn) // see below
}));
console.log("number of tenant", tenantModels.length);
let tenantGqlSchemas = tenantModels
  .map(tenant => ({
    ...tenant,
    gqlSchema: createGQLSchema(tenant.models) // see below
  }))
  .reduce((map, tenant) => {
    // console.log(map,tenant)
    let temp = {
      ...map,
      [tenant.name]: tenant.gqlSchema
    };
    return temp;
  }, {});
export { tenantGqlSchemas };

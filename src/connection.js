import mongoose from 'mongoose';
import {createModels,createGQLSchema} from './initModel';
const mainDB = mongoose.createConnection('mongodb://localhost:27017/ATMS')

let tempArray=Array.from(Array(2).keys());
//[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

// const tenantsConfig = [
//     { name: 't1', db: 't1', connStr: `mongodb://localhost:27017/t1` },
//     { name: 't2', db: 't2', connStr: `mongodb://localhost:27017/t2` }
// ];

const tenantsConfig=tempArray.map(item=>{
   return {name:`t${item}`,db:`t${item}`,connStr:`mongodb://localhost:27017/t${item}`};
})


let tenantConns = tenantsConfig.map(tenant => ({
    ...tenant,
    conn: mainDB.useDb(tenant.db)

}));

let tenantModels = tenantConns.map(tenant => ({
  ...tenant,
  models: createModels(tenant.conn) // see below
}));

let a=createGQLSchema(tenantModels[0].models);
let tenantGqlSchemas = tenantModels.map(tenant => ({
  ...tenant,
  gqlSchema: createGQLSchema(tenant.models) // see below
})).reduce((map, tenant) => {
  console.log(map,tenant)
  let temp={
    ...map,
    [tenant.name]: tenant.gqlSchema
  }
  return temp;
}, {});
export {tenantGqlSchemas};


import MTGQL from 'mongoose-schema-to-graphql';
import {AddresSchema} from '../models/address';

console.log(AddresSchema);
let configs = {
              name: 'addressType',
              description: 'Address schema',
              class: 'GraphQLObjectType',
              schema: AddresSchema,
              exclude: ['_id']
          }
          
export let addressType = MTGQL(configs);
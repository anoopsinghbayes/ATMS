import MTGQL from 'mongoose-schema-to-graphql';
import {AddresSchema} from '../models/address';

let configs = {
              name: 'addressType',
              description: 'Address schema',
              class: 'GraphQLObjectType',
              schema: AddresSchema,
              exclude: ['_id']
          }
          
export let addressType = MTGQL(configs);
console.log(addressType);


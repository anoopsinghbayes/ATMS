//import MTGQL from '../mtgql';
import MTGQL from 'mongoose-schema-to-graphql';
import {customerSchema} from '../models/quiz';

let configs = {
              name: 'customerType',
              description: 'Sam schema',
              class: 'GraphQLObjectType',
              schema: customerSchema,
              exclude: ['_id']
          }
          
export let addressType = MTGQL(configs);




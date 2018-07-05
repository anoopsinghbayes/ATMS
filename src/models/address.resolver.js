import { Address } from "./address";
const resolveFunctions = {
  Mutation: {
    async addAddress(_, { address }, context, fields) {
      let add = new Address(address);
      let newaddress = await add.save();
      return newaddress;
    }
  }
};
export default resolveFunctions;

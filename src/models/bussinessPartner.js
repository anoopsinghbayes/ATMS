import { util } from "util";
import mongoose, { Schema } from "mongoose";
import { AddressSchema } from "./address";

const BusinessPartnerOptions = { discriminatorKey: "kind" };
/**
 * Employee Enum
 */

var gender_type = {
  values: ["Male", "Female"],
  message: "Invalid Sex type"
};

var marital_type = {
  values: ["Single", "Married"],
  message: "Invalid Marital type"
};

var job_type = {
  values: ["Job1", "Job2"],
  message: "Invalid job_type"
};

/**
 * Business Partner Schema
 */
let BusinessPartnerSchema = new Schema(
  {
    kind: {
      type: String,
      enum: ["Customer", "Vendor", "Employee"]
    },
    companyName: {
      type: String,
      required: true
    },
    created: {
      type: Date,
      default: Date.now
    },

    addressIds: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    user: {
      type: String
    }
  },
  BusinessPartnerOptions
);

const BusinessPartner = mongoose.model(
  "BusinessPartner",
  BusinessPartnerSchema
); // our base model
let CustomerSchema = new Schema({
  credit: {
    limit: { type: Number, min: 0, required: false },
    period: { type: Number, min: 0, required: false }
  },
  salesRep: {
    name: {
      type: String,
      trim: true
    },
    phL: {
      type: String
    },
    phM: {
      type: String
    }
  }
});

var VendorSchema = new Schema({
  vendorRep: {
    name: {
      type: String,
      trim: true
    }
  }
});

var EmployeeSchema = new Schema({
  fName: {
    type: String,
    trim: true
  },
  mName: {
    type: String,
    trim: true
  },
  lName: {
    type: String,
    trim: true
  },
  jobTitle: {
    type: String,
    enum: job_type
  },
  gender: {
    type: String,
    enum: gender_type
  },
  age: {
    type: Number,
    default: 0
  },
  maritalStatus: {
    type: String,
    enum: marital_type
  },
  birthDate: {
    type: Date,
    default: 0
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  terminationDate: {
    type: Date,
    default: 0
  },
  basicSalary: {
    type: Number,
    default: 0
  },
  licenceNo: {
    // applicable for driver
    type: String
  }
});
const Customer = BusinessPartner.discriminator("Customer", CustomerSchema); // our derived model (see discriminator)

const Vendor = BusinessPartner.discriminator("Vendor", VendorSchema); // our derived model (see discriminator)

const Employee = BusinessPartner.discriminator("Employee", EmployeeSchema); // our derived model (see discriminator)

Vendor.schema.eachPath((path, schema) => {
  let PathType = Vendor.schema.pathType(path);
  console.log("is", path, PathType);
});

export {
  BusinessPartnerSchema,
  CustomerSchema,
  BusinessPartner,
  Customer,
  Vendor,
  Employee
};

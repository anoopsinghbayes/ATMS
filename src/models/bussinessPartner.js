import { util } from "util";
import mongoose, { Schema } from "mongoose";

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
var kind = {
  values: ["Customer", "Vendor", "Employee"],
  message: "Invalid Kind"
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

let CustomerSchema = new Schema(
  {
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
  },
  BusinessPartnerOptions
);

var VendorSchema = new Schema(
  {
    vendorRep: {
      name: {
        type: String,
        trim: true
      }
    }
  },
  BusinessPartnerOptions
);

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

export { BusinessPartnerSchema, CustomerSchema, VendorSchema, EmployeeSchema };

'use strict';var _mongoose = require('mongoose');
var _mongooseAutoIncrement = require('mongoose-auto-increment');


var Schema = _mongoose.mongoose.Schema;


var util = require('util');
var orderStatusEnum = ["open", "confirmed", "closed", "cancelled"];
var cargoUnitEnum = ["l", "kl", "t"];
var paymentStatusEnum = ["pending", "confirmed", "cancelled"];
/*
                                                               location types
                                                                Ultimate Pickup  UP
                                                                "Ultimate Drop-off" UD
                                                                Intermediate Pickup IP
                                                                Intermediate Drop-off ID
                                                                Dead Weight DW
                                                               */

var locationTypeEnum = ["UP", "UD", "IP", "ID", "DW"];

function AbstractOrdersSchema() {
    Schema.apply(this, arguments);
    this.add({
        created: {
            type: Date,
            default: Date.now },

        orderStatus: {
            type: String,
            enum: orderStatusEnum },

        productId: {
            type: String,
            ref: 'Item',
            $tenant: true },

        bpId: {
            type: String,
            ref: 'BusinessPartner',
            $tenant: true },

        bpAddress: {
            type: Schema.ObjectId,
            ref: 'Address',
            $tenant: true },

        StartDate: {
            type: Date,
            trim: true },

        EndDate: {
            type: Date,
            trim: true } });


};


util.inherits(AbstractOrdersSchema, Schema);

var OrderSchema = new AbstractOrdersSchema({});



/*
                                                
                                                Trip will have validations like
                                                minimum and maximum one Utlimate Pickup and Ultimate Dropoff .
                                                
                                                 locationType will be Enum  -->
                                                  1.Utlimate Pickup 2.Intermediate Pickup 3.Intermediate Dropoff 4.Ultimate Dropoff 5. Dead Weight
                                                 cargoUnit will be Enum  -->
                                                 kl,l,kg,t
                                                 distance   == distance from last pickup or dropoff location
                                                 date == Date on which cargo is loaded or unloaded
                                                 */


var TripSchema = new Schema({

    locationType: {
        type: String,
        enum: locationTypeEnum },

    address: {
        type: String },

    challanNo: {
        type: String },

    date: {
        reporting: {
            type: Date },

        loadingUnloading: {
            type: Date } },


    odometer: {
        type: Number },

    distance: {
        calculated: {
            type: Number },

        actual: {
            type: Number } },



    cargoWeight: {
        tyreWeight: {
            type: Number },

        netWeight: {
            type: Number },


        grossWeight: {
            type: Number },


        shortage: {
            type: Number },


        cargoUnit: {
            type: String,
            enum: cargoUnitEnum } } });








var TripOrderFinance = new Schema({

    itemCategory: {
        type: String // will come from Item master
    },
    itemTitle: {
        type: String //will come from Item master
    },
    itemId: {
        type: Schema.ObjectId, //Item which is added from item master based on itemCategory and item title
        ref: 'Item',
        $tenant: true },

    description: {
        type: String //description will be same attribute of item master
    },
    unit: {
        type: String //e.g. per day/per month/per hour/per litre for diesel etc
    },
    totalUnit: {
        type: Number },

    costPerUnit: {
        type: Number },

    actualCost: {
        type: Number },

    salesCost: {
        type: String },

    invoice: {
        sales: {
            type: Boolean //replaced with chargeable so that it would be more specific where should this line be shown
        },
        cost: {
            type: Boolean //i.e in sales invoice ,in cost invoice or both
        } } });




util.inherits(AbstractOrdersSchema, Schema);
var OrdersSchema = new AbstractOrdersSchema({});

/*
                                                 
                                                  orderType will be Boolean -->
                                                  Subcontracted =true For trip subcontracted to other transporter.
                                                  By Default It will be set to false in UI
                                                 
                                                  SubcontractorId will be mandatory if isSubcontracted is true
                                                 
                                                  doNo == Delivery Order Number of client
                                                 
                                                  */

var TripOrderSchema = new AbstractOrdersSchema({

    vehicleNo: {
        type: Schema.ObjectId,
        ref: 'Item',
        $tenant: true },

    doNo: {
        type: String },

    isSubContracted: {
        type: Boolean },

    subcontractorId: {
        type: Schema.ObjectId,
        ref: 'BusinessPartner',
        $tenant: true },

    tripDetails: {
        type: [TripSchema] },

    finance: {
        type: [TripOrderFinance] },

    driver: {
        type: String,
        ref: 'BusinessPartner',
        $tenant: true },

    quantity: {
        type: Number },

    costSummary: {
        rateUnit: {
            type: String },


        rate: {
            type: Number },

        taxPercentage: {
            type: Number },

        taxAmount: {
            type: Number },

        Amount: {
            type: Number } } });








/*
                                 
                                 
                                   */



var RentalOrderSchema = new AbstractOrdersSchema({

    vehicleNo: {
        type: Schema.ObjectId,
        ref: 'Item',
        $tenant: true },

    finance: {
        type: [TripOrderFinance] } });





/*
                                       In purchase order
                                        Chargeable =true by default and need not to show in UI because all lines will be chargeable
                                        */


var EMISchema = new Schema({

    paymentStatus: {
        type: String,
        enum: paymentStatusEnum },

    amount: {
        type: Number },

    chequeNo: {
        type: Number },

    bankName: {
        type: String },

    payeeName: {
        type: String },

    chequeDate: {
        type: Date },

    emiDueDate: {
        type: Date } });





var LoanSchema = new Schema({

    customerName: {
        type: String },

    agreementNo: {
        type: String },

    assetCost: {
        type: Number },

    amountFinanced: {
        type: Number },

    downPayment: {
        type: Number },

    tenureInMonths: {
        type: Number },

    totalInstallments: {
        type: Number },

    bankName: {
        type: String },

    loanType: {

        type: String,
        default: "Hire Purchase" },

    agreementDate: {
        type: Date },

    repayFrequency: { //Loan Re Payment frequency in Months
        type: Number },

    residualValue: {
        type: Number },

    agreementMode: {
        type: String,
        default: "Arrier" },

    advanceEMI: {
        type: Number },

    vehicleNo: {
        type: String },

    emiDetails: {
        type: [EMISchema] } });







var PurchaseOrderFinance = new Schema({

    itemCategory: {
        type: String // will come from Item master
    },
    itemTitle: {
        type: String //will come from Item master
    },
    itemId: {
        type: Schema.ObjectId, //Item which is added from item master based on itemCategory and item title
        ref: 'Item',
        $tenant: true },

    description: {
        type: String //description will be same attribute of item master
    },
    actualCost: {
        type: Number },

    salesCost: {
        type: String },

    chargeable: {
        type: Boolean,
        default: true } });





/*
                                    billNo: Bill Reference number is Invoice/Bill number of item purchased
                                    billDate: Date of Bill
                                    loanDetails: Loan details is applicable in case of vehicle purchase
                             */

var PurchaseOrderSchema = new AbstractOrdersSchema({

    billNo: {
        type: String },

    billDate: {
        type: Date },

    finance: {
        type: [PurchaseOrderFinance] },

    loanDetails: {

        type: [LoanSchema] } });




/*
                                 In sales order actual cost will be equal to sales cost in most senarios
                                 In sales order Chargeable=true in all cases .
                                 
                                  */



var SalesOrderFinance = new Schema({

    itemCategory: {
        type: String // will come from Item master
    },
    itemTitle: {
        type: String //will come from Item master
    },
    itemId: {
        type: Schema.ObjectId, //Item which is added from item master based on itemCategory and item title
        ref: 'Item',
        $tenant: true },

    description: {
        type: String //description will be same attribute of item master
    },
    actualCost: {
        type: Number },

    salesCost: {
        type: String },

    chargeable: {
        type: Boolean,
        default: true } });




var SalesOrderSchema = new AbstractOrdersSchema({

    finance: {
        type: [SalesOrderFinance] } });





var ServiceOrderFinance = new Schema({

    itemCategory: {
        type: String // will come from Item master
    },
    itemTitle: {
        type: String //will come from Item master
    },
    itemId: {
        type: Schema.ObjectId, //Item which is added from item master based on itemCategory and item title
        ref: 'Item',
        $tenant: true },

    description: {
        type: String //description will be same attribute of item master
    },
    perDayCharge: {
        type: Number //e.g. per day charge of employee for salary calculation
    },
    totalDays: {
        type: Number },

    actualCost: {
        type: Number },

    salesCost: {
        type: String },

    chargeable: {
        type: Boolean //Chargeable =true if add to customer invoice else keep it as internal expense
    } });







var ServiceOrderSchema = new AbstractOrdersSchema({

    billNo: {
        type: String //Bill No in Case of electricity or telephone bill
    },
    billDate: {
        type: Date },


    finance: {
        type: [ServiceOrderFinance] } });







var Order = _mongoose.mongoose.mtModel('Order', AbstractOrdersSchema); // our base model


TripOrderSchema.plugin(_mongooseAutoIncrement.autoIncrement.plugin, 'Trip');
var TripOrder = Order.discriminator('OTRP', TripOrderSchema);


SalesOrderSchema.plugin(_mongooseAutoIncrement.autoIncrement.plugin, 'Sales');
var SalesOrder = Order.discriminator('OSLS', SalesOrderSchema);

ServiceOrderSchema.plugin(_mongooseAutoIncrement.autoIncrement.plugin, 'Service');
var ServiceOrder = Order.discriminator('OSER', ServiceOrderSchema);

RentalOrderSchema.plugin(_mongooseAutoIncrement.autoIncrement.plugin, 'Rental');
var RentalOrder = Order.discriminator('OREN', RentalOrderSchema);

PurchaseOrderSchema.plugin(_mongooseAutoIncrement.autoIncrement.plugin, 'Purchase');
var PurchaseOrder = Order.discriminator('OPUR', PurchaseOrderSchema);
//# sourceMappingURL=order.js.map
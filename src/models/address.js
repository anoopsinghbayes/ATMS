import mongoose,{Schema} from 'mongoose';

var AddressSchema=new Schema({

        adl1:{
            type: String,

            trim: true
        },
        adl2:{
            type: String,

            trim: true
        },

        street:{
            type: String,
            trim: true
        },
        city:{
            type: String,
            trim: true

        },
        state:{
            type: String
        },
        pin:{
            type: Number

        },
        phM1:{
            type: String

        },
        phM2:{
            type: String

        },
        phL:{
            type: String

        },
        email:{
            type:String,
            trim:true
        },
        user: {
            type: String
        }
});

let Address= mongoose.model('Address',AddressSchema);

export{
    AddressSchema,
    Address
}
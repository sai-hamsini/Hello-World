const mongoose = require("mongoose")
const bcrypt = require( 'bcrypt' );
const jwt = require("jsonwebtoken")

var Schema  = mongoose.Schema;
var patientSchema = new Schema(
    {
        name: {
            type:String,
            required: true
        },
        gender: {
            type:String,
            required: true
        },
        age: {
            type:Number,
            required: true
        },
        address: {
            type:String,
            required: true
        },
        phone: {
            type:Number,
            required: true
        },
        username:{
            type: String,
            required: true
        },
        password:{
            type: String,
            trim: true,
            required : true
        },
        tokens:[
            {
                token:{
                    type:String,
                }
            }
        ]
    }
)

patientSchema.pre("save", async function (next) {
    const patient = this;
    if (patient.isModified("password")) {
      patient.password = await bcrypt.hash(patient.password, 8);
    }
    next();
  });

patientSchema.statics.findByCredentials = async (name,password)=>{
    const patient = await Patient.findOne({name})
        const isMatch = await bcrypt.compare(password,patient.password)
            if(!isMatch)
            {
                throw new Error();
            }
            return patient;
  }

patientSchema.methods.generateAuthToken = async function(){
    const patient = this;
    const token = jwt.sign({_id: patient._id.toString()},"admin0");
    patient.tokens = patient.tokens.concat({token});
    await patient.save();
    return token;
}

const Patient = mongoose.model('patient',patientSchema);
module.exports = Patient;
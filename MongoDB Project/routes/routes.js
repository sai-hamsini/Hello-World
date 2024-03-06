const express = require("express");
const router = express.Router();
var patientModel = require('../src/patients/patientModel');
const Patient = require("../src/patients/patientModel");

// Patients login
router.post("/patients/login", async (req,res)=>{
    try{
        const patient = await Patient.findByCredentials(req.body.name,req.body.password);
        const token = await patient.generateAuthToken();
        res.send({patient,token});
    }
    catch(error)
    {
        res.status(401).send();
    }
})

//Add Records
router.post('/patients/create', async (req, res) => {
    try {
      const patient = new patientModel(req.body);
      await patient.validate();
      await patient.save();
      res.status(201).send({
        status: true,
        message: "Patient Created Successful!"
      });
    } catch (error) {
      res.status(400).send(error);
    }
  });

//View Records
router.get('/patients', async(req,res)=>{
   try{
        const patients = await patientModel.find({});
        res.send(patients);
   }
   catch(error)
   {
        res.status(400).send(error);
   }
});

//find records
router.get('/patients/:id', async(req,res)=>{
    try{
         const _id = req.params.id;
         const patients = await patientModel.findById({_id});

        if(!patients)
        {
            return res.status(404).send();
        }  
        return res.status(200).send(patients); 
    }
    catch(error)
    {
         res.status(400).send(error);
    }
 });

//Update patient records
 router.patch('/patients/:id', async(req,res)=>{
    try{
        const _id = req.params.id;
        const body = req.body;
        const updatepatients = await patientModel.findByIdAndUpdate(_id,body,{new:true});

        if(!updatepatients)
        {
            return res.status(404).send();
        }  
     
        res.status(201).send(
            {
                "status" : true,
                "message" : "Patient updated successfully!"
            });
    }
    catch(error)
    {
         res.status(400).send(error);
    }
 });

//delete patient records
 router.delete('/patients/:id', async(req,res)=>{
    try{
        const _id = req.params.id;
        const deletepatients = await patientModel.findByIdAndDelete(_id);

        if(!deletepatients)
        {
            return res.status(404).send();
        }  
       
        res.status(201).send(
            {
                "status" : true,
                "message" : "Patient Deleted Successfully!"
            });
    }
    catch(error)
    {
         res.status(400).send(error);
 
    }
 });

 router.post('/patients/logout', async(req,res)=>{
    try{
            req.patient.tokens = req.patient.tokens.filter((token)=>{
                return token.token !== req.token;
            })
            await req.patient.save();
            res.send();
    }
    catch(error)
    {
         res.status(400).send(error);
 
    }
 });
module.exports = router;
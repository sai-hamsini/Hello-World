var userModel = require('./userModel')

module.exports.getDataFromDBService = () => {
    return new Promise(function checkURL(resolve, reject){
        userModel.find()
        .then(function (models) {
            console.log(models);
        })
        .catch(function (err) {
            console.log(err);
        });
        
    });
}

module.exports.createUserDBService = (playerdetails) => {
    return new Promise(function myFn(resolve, reject) {
 
        var userModelData = new userModel();

        userModelData.name = playerdetails.name;
        userModelData.position = playerdetails.position;
        userModelData.rushingYards = playerdetails.rushingYards;
        userModelData.touchdowns = playerdetails.touchdowns;
        userModelData.sacks = playerdetails.sacks;
        userModelData.fieldGoalsMade = playerdetails.fieldGoalsMade;
        userModelData.fieldGoalsMissed = playerdetails.fieldGoalsMissed;
        userModelData.catches = playerdetails.catches;
 
        userModelData.save()
        .then(() => {
            console.log("Player created successfully.");
        })
        .catch(error => {
            console.log("Unable to add player to database.", error);
        });
 
    });
 
 }


module.exports.updateUserDBService = (id,playerdetails) => {     
    console.log(playerdetails);
    return new Promise(function myFn(resolve, reject) {
        userModel.findByIdAndUpdate(id, playerdetails)
        .then((doc) => {
            console.log("Player updated successfully!");
        })
        .catch((error) => {
            console.log("Could not update player.", error);
        });
 
    });
 }

 module.exports.removeUserDBService = (id) => { 
    return new Promise(function myFn(resolve, reject) {
        userModel.findByIdAndDelete(id)
        .then((doc)=>{
            console.log("Player deleted successfully!");
        })
        .catch((error)=>{
            console.log("Error deleting the player", error);
        });
    });
 
 }
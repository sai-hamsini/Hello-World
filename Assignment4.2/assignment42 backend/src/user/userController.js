var userService = require('./userService');

var getDataControllerfn = async (req, res) =>
{
    var teams = await userService.getDataFromDBService();
    res.send({ "status": true, "data": teams });
}

var createUserControllerFn = async (req, res) => 
{
    var status = await userService.createUserDBService(req.body);
    if (status) {
        res.send({ "status": true, "message": "Player created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating player" });
    }
}

var updateUserController = async (req, res) => 
{
    console.log(req.params.id);
    console.log(req.body);
     
    var result = await userService.updateUserDBService(req.params.id,req.body);

     if (result) {
        res.send({ "status": true, "message": "Player updated successfully"} );
     } else {
         res.send({ "status": false, "message": "Player update failed!" });
     }
}

var deleteUserController = async (req, res) => 
{
     console.log(req.params.id);
     var result = await userService.removeUserDBService(req.params.id);
     if (result) {
        res.send({ "status": true, "message": "Player Deleted Successfully!"} );
     } else {
         res.send({ "status": false, "message": "Player Delete Failed!" });
     }
}
module.exports = { getDataControllerfn, createUserControllerFn,updateUserController,deleteUserController };
const global = require("../constant/globalvar")
let FILE_PATH = './crud.json';
const fs = require("fs")


/*
//////////////////////////////
method-name = @getAllUser 
method-type = GET
@params
NA
author : Bhagwat Gavande
Date   : 29-12-2023
///////////////////////////////
*/
const getAllUser = async (req, res) => {
    try {
        const Data = await fs.readFileSync(FILE_PATH, 'utf8');
        let data = JSON.parse(Data);
        if (data) {
             res.status(200).json({
                data
            });
        } else {
             res.status(400).json({
                message:usernot
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
/*
//////////////////////////////
method-name = @getAllUserByID 
method-type = GET
@params
@id number
author : Bhagwat Gavande
Date   : 29-12-2023
///////////////////////////////
*/
const getAllUserByID = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).send({ message: idrequired });
        }
        const userId = parseInt(req.params.id);
        const userData = await fs.readFileSync(FILE_PATH, 'utf8');
        let data = JSON.parse(userData);
        if (!data) {
            return res.status(400).send({ message: idrequired });
        }
        const filteredData = data.filter((user) => user.userId === userId);
        if (filteredData) {
             res.status(200).json({
                data: filteredData
            });
        } else {
             res.status(400).json({
                message:usernot
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
/*
//////////////////////////////
method-name = UsersignUp 
method-type = POST
@params
@username string 
@mobile number
author : Bhagwat Gavande
Date   : 29-12-2023
///////////////////////////////
*/
const UsersignUp = async (req, res) => {
    try {
        if (!req.body.username || !req.body.mobile || !req.body.firstname || !req.body.lastname) {
            return res.status(400).send({ message: all});
        }
        const existingData = await fs.readFileSync(FILE_PATH, 'utf8');
        let data = JSON.parse(existingData);
        if (!Array.isArray(data)) {
            data = []; 
        }
        const { firstname ,lastname ,username, mobile } = req.body;
        const newUserId = data.length + 1; 
        const newUser = {
            "userId":newUserId,
            "firstname":firstname,
            "lastname":lastname,
            "username":username,
            "mobile":mobile
        };
        data.push(newUser);
        await fs.promises.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
        if(data)
        {
            res.status(200).json({ data:newUser,message: userregistred });
        }else{
            res.status(401).json({message: somethingwent });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
/*
//////////////////////////////
updateUserByID 
@params
@userId number 

author : Bhagwat Gavande
Date   : 29-12-2023
///////////////////////////////
*/
const updateUserByID = async (req, res) => {
    try {
        if (!req.body.username || !req.body.mobile) {
            return res.status(400).send({ message: all });
        }
        let FILE_PATH = 'crud.json';
        const existingData = fs.readFileSync(FILE_PATH, 'utf8');
        let data = JSON.parse(existingData);
        // Check if 'data' is an array
        if (!Array.isArray(data)) {
            data = []; // Initialize as an empty array if it's not an array
        }
        const { firstname, lastname , username, mobile ,userId} = req.body;
        // Find the user to update (assuming 'userId' is unique)
        const userToUpdate = data.find(user => user.userId === userId);
        if (userToUpdate) {
            // Update the user's mobile number
            userToUpdate.firstname = firstname;
            userToUpdate.lastname = lastname;
            userToUpdate.mobile = mobile;
            userToUpdate.username = username;
            // Write the updated data back to the file
            fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
            res.status(200).json({ message: updated});
        } else {
            res.status(404).json({ message: somethingwent});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }           
}
/*
//////////////////////////////
deleteUserByID 
@params
@userId number 

author : Bhagwat Gavande
Date   : 29-12-2023
///////////////////////////////
*/
const deleteUserById = (userId, data) => {
    const index = data.find(user => user.userId === parseInt(userId));
    if (index !== -1) {
        data.splice(index, 1);
        const updatedData = [...data.slice(0, index), ...data.slice(index + 1)];
        return updatedData; // Return the updated data instead of manipulating 'data' directly
    }
    return data; // Return the original data if user is not found
};
const deleteUserByID = async (req, res) => {
    try {
        if(!req.params.userId){
            return res.status(400).send({ message: idrequired });
        }
        const existingData = fs.readFileSync(FILE_PATH, 'utf8');
        let data = JSON.parse(existingData);
        // Check if 'data' is an array
        if (!Array.isArray(data)) {
            data = []; // Initialize as an empty array if it's not an array
        }
        const { userId } = req.params;

        // Delete the user by userId
        const isDeleted = deleteUserById( userId, data);
        if (isDeleted) {
            // Write the updated data back to the file after deletion
            fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
            res.status(200).json({ message: deleted });
        } else {
            res.status(404).json({ message: somethingwent});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = {
    UsersignUp,
    getAllUser,
    getAllUserByID,
    updateUserByID,
    deleteUserByID
}
import UserModel from "../Model/userModel.js";
// user create
export const createUserController = async (req, res) => {
    try {
        const{name, email, password}=req.body
        const response = await UserModel.createUserModel({name, email, password});
        res.status(201).json({  
            message: "User has been created", 
            userId: response 
        });
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
// get all users
export const getAllUsersController = async (req, res) => {
   try{
        const data = await UserModel.getAllUsersModel();
        res.json(data)
   }catch(err){
        res.status(500).json({error : err.message})
   } 
}
export const updateUserPasswordController = async (req, res) => {
    try{
        const {password} = req.body;
        const updatePassword = await UserModel.updateUserPasswordModel(req.params.id, {password});
        if(!updatePassword){
            res.status(404).json({message: "User not found"})
        }
        else{
            res.json({message:"Password has been updated"})
        }
    }catch(err){
        res.status(500).json({error : err.message})
    }
}
export const deleteUserController = async (req, res) => {
    try{
        const delte = await UserModel.deleteUserModel(req.params.id);
        if(!delte){
            res.json({message: "User not found"})
        }
        else{
            res.json({message:"User has been deleted"})
        }
    }catch(err){
        res.status(500).json({error : err.message})
    }
}

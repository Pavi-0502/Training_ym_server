import { hashPassword,passwordCheck } from "../utils/hash.js";
import { createToken } from "../utils/token.js";
import AuthUserModel from "../Model/authUserModel.js"
import userRoute from "../Routes/userRoutes.js";

export const authSignup = async (req,res)=>{ 
    try {
        const {name, email, password, role} = req.body;
        const checkEmail = await AuthUserModel.userLoginModel({email});
        if(checkEmail){
            return res.status(400).json({message: "Email already exists"})
        }
    const newPassword = await hashPassword(password);

    const id = await AuthUserModel.userSignupModel({
        name,
        email,
        password: newPassword,
        role : role || "user"
    });
   res.status(201).json({
    message: "User has been created",
    userId: id})
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export const authLogin = async (req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await AuthUserModel.userLoginModel({email});
        if(!user){
            return res.status(400).json({message: "Invalid credentials"})
        }
        const checkPassword = await passwordCheck(password,user.password);
        if(!checkPassword){
            return res.status(400).json({message: "Wrong Password"})
        }
        const token = createToken({
            id: user.id, 
            role: user.role
        });
        res.json(200).json({message: "Login successful" , token }); 
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

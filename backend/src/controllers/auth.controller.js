import User from "../models/user.model.js"
import bycrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req,res) => {
  const {fullName,email,password} = req.body
  try {
    if(!fullName || !email || !password){
      return res.status(400).json({message: "Please provide all required fields"});
    }
    if(password.length < 6){
      return res.status(400).json({message: "Password must be at least 6 characters long"});
    }
    const user = await User.findOne({email})

    if(user){
      return res.status(400).json({message: "User already exists"});
    }

    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password,salt)

    const newUser = new User ({
      fullName: fullName,
      email: email,
      password:hashedPassword
    })

    //generate jwt token 
    generateToken(newUser.id,res)
    await newUser.save();

    res.status(201).json({
      _id:newUser._id,
      fullName:newUser.fullName,
      email:newUser.email,
      profilePic:newUser.profilePic,
    })
  } catch (error) {
    console.log("Error in signup controller",error.message);
    res.status(500).json({message: "Internal Server Error"});
  }
};

export const login = async (req,res) => {
  const {email,password} = req.body
  try {
    const user = await  User.findOne({email})
    if(!user){
      return res.status(400).json({message: "Invalid email or password"});
    }
    const isMatch = await bycrypt.compare(password,user.password)
    if(!isMatch){
      return res.status(400).json({message: "Invalid email or password"});
    }
    generateToken(user._id,res)
    res.status(200).json({
      _id:user._id,
      fullName:user.fullName,
      email:user.email,
      profilePic:user.profilePic,
    })
  } catch (error) {
    console.log("Error in login controller",error.message);
    res.status(500).json({message: "Internal Server Error"});
  }
};

export const logout = (req,res) => {
  try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message: "Logged out successfully"})
  } catch (error) {
    console.log("Error in logout controller",error.message);
    res.status(500).json({message: "Internal Server Error"});
  }
};

export const updateProfile = async (req,res) => {
  try {
    const {profilePic} = req.body;
    const userId = req.user._id;


    if(!profilePic){      
      return res.status(400).json({message: "Profile picture is required"});
    }

    const uploadedResponse = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(userId,{
      profilePic: uploadedResponse.secure_url
    },{new:true})
    res.status(200).json(updatedUser)
  } catch (error) {
    console.log("Error in updateProfile controller",error.message);
    res.status(500).json({message: "Internal Server Error"});
  }
};

export const checkAuth = (req,res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.log("Error in checkAuth controller",error.message);
    res.status(500).json({message: "Internal Server Error"});
  }
};


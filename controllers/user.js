import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendCookies } from "../utils/features.js"
import jwt from "jsonwebtoken"
import ErrorHandler from "../middlewares/error.js"

export const login = async (req, res) => {

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    //  if(!user)
    //  return res.status(404).json({
    //     success:false,
    //     message:"Invalid email or password"
    //  });

    if (!user)
      return next(new ErrorHandler("Invalid email or password", 400));


    const isMatch = await bcrypt.compare(password, user.password);

    //  if(!isMatch)
    //  return res.status(404).json({
    //     success:false,
    //     message:"Invalid email or password"
    //  });

    if (!isMatch)
      return next(new ErrorHandler("Invalid email or password", 404));


    sendCookies(user, res, `Welcome back, ${user.name}`, 200)
  }
  catch (error) {
    next(error)
  }
}


export const register = async (req, res) => {

  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    // if(user)
    //   return res.status(404).json({
    //      success:false,
    //      message:"User already exist"
    //   })

    if (user)
      return next(new ErrorHandler("User already exist", 400));

    const hashedPassword = await bcrypt.hash(password.toString(), 10)
    user = await User.create({ name, email, password: hashedPassword })

    sendCookies(user, res, "Registered successfully", 201)

  }
  catch (error) {
    next(error)
  }
}




export const getMyProfie = (req, res) => {

  res.status(200).json({
    success: true,
    user: req.user
  })
}

export const logout = (req, res) => {

  res.status(200).cookie("token", "", { 
    expires: new Date(Date.now()),
    sameSite:process.env.NODE_ENV === "Development"?"lax":"none",
    secure:process.env.NODE_ENV === "Development"?false:true

   }).json({
    success: true,
    user: req.user
  })
}


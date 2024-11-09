import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  // Hash the password
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    // create a new user and save to DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    // res.send(newUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};
export const login = async (req, res) => {
  // db operations
  const { username, password } = req.body;

  try {
    // Check if the user exist or not
    const user = await prisma.user.findUnique({
      // where: { username: username },
      where: { username },
    });
    if (!user) return res.status(404).json({ message: "Invalid Credentials" });

    // Check if the password is correct
    // using bcrypt compared message
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password" });
    // if (isPasswordValid)
    //   return res.status(200).json({ message: "Login Successfull" });
    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success");
    // generate cookie token and send to the user
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: true,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        //secure: false,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
    // console.log(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login" });
  }
};
export const logout = (req, res) => {
  // db operations
  res.clearCookie("token").status(200).json({ message: "Logout successfull" });
};

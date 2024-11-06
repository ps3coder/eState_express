import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  // Hash the password
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
};
export const login = (req, res) => {
  // db operations
  console.log("login endpoints");
};
export const logout = (req, res) => {
  // db operations
  console.log("logout endpoints");
};

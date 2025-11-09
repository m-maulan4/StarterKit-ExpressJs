import { userModel } from "./userModel.js";

export const getUsers = async (req, res) => {
  const users = await userModel.findAll();
  res.send(users);
};

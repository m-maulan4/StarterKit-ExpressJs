import { userModel } from "./userModel.js";

export const getUsers = async (req, res) => {
  const users = await userModel.findAll({
    attributes: { exclude: ["password"] },
  });
  res.send(users);
};

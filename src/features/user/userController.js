import { userModel } from "./userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.findAll({
      attributes: { exclude: ["password"] },
    });
    return res.send(users);
  } catch (error) {
    return res.status(404);
  }
};

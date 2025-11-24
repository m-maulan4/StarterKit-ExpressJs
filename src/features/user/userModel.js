import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import { db } from "../../config/db/index.js";
export const userModel = db.define(
  "users",
  {
    fullname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // token_crf: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
  },
  {
    tableName: "users",
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        const slat = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, slat);
      },
    },
  }
);
(async () => {
  await userModel.sync();
  const checkUserAdmin = await userModel.count();
  if (checkUserAdmin === 0) {
    await userModel.create({
      fullname: "admin",
      username: "admin",
      password: "admin",
    });
  }
})();

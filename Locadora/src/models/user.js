import crypto from "crypto";

export default (sequelize, DataType) => {
  return sequelize.define(
    "user",
    {
      id: {
        type: DataType.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      hooks: {
        beforeCreate: (user) => {
          user.set(
            "password",
            crypto.createHash("md5").update(user.password).digest("hex")
          );
        },
      },
    }
  );
};

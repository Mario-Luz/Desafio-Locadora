export default (sequelize, DataType) => {
  return sequelize.define("movie", {
    id: {
      type: DataType.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    director: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    stock: {
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  });
};

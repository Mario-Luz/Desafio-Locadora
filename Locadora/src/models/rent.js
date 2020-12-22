export default (sequelize, DataType) => {
  return sequelize.define("rent", {
    id: {
      type: DataType.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataType.BIGINT.UNSIGNED,
    },
    movieId: {
      type: DataType.BIGINT.UNSIGNED,
    },
    date: {
      type: DataType.DATE,
    },
    return: {
      type: DataType.DATE,
    },
  });
};

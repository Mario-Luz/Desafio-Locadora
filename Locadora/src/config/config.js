import dotEnv from "dotenv-safe";
dotEnv.config();

const { DB_NAME, DB_USER, DB_PASS, DB_HOST, SECRET } = process.env;

export default {
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASS,
  params: {
    dialect: "mysql",
    host: DB_HOST,
    define: {
      underscored: true,
    },
  },
  jwtSecret: SECRET,
  jwtSession: { session: true },
};

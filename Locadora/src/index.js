import app from "./app";

app.listen(app.get("port"), () => {
  console.log(`API Running on PORT ${app.get("port")}`);
});

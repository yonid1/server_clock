import seq from "./connect/sequelize.js";
import express from "express";
import cors from "cors";
import main from "./src/main.js";
import user from "./src/user.js";
import def from "./src/index.js"
const app = express();
app.use(express.urlencoded());
app.use(cors());
app.use(express.json());

seq
  .sync
  //  { force: true }
  // {alert:true}
  ()

  .then((res) => {
    console.log("hii");

    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(main,def,user)

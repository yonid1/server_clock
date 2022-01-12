import moment from "moment";
import seq from "./connect/sequelize.js";
import express from "express";
import cors from "cors";

import generateToken from "./connect/generteToken.js";
import Jwt, { decode } from "jsonwebtoken";

import List from "./connect/moduleDefine.js";
import Timeworks from "./connect/moduleDefine.js";
// import test from './src/index.js';
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


// app.use(import('./src/index.js'),(req,res,next)=>{
//   console.log("test",Date.now());next()
// })
app.use(main,def,user)

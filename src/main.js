import express from "express";
import myModule from '../connect/moduleDefine.js'
import generateToken from "../connect/generteToken.js"
import Jwt, { decode } from "jsonwebtoken";

const router = express.Router()
const app = express();
app.locals.pass = 0;
app.locals.id = 0;

router.post("/loginmanger", async (req, res) => {
    const manger = { name: "yoni", password: "300138013" };
    const { name, password } = req.body;
  
    // console.log("manger", table);
    if (name === manger.name && password === manger.password) {
      res.send({ token: generateToken.crateTokenManger(req.body.name) });
    }
  });
router.post("/main", async (req, res) => {
    const table = await myModule.db.List.findAll({});
    const token = req.headers["x-access-token"];
  
    if (!token) {
      res.send({ massage: "no token " });
    } else {
      Jwt.verify(token, "MySecreteManger", (err, decoded) => {
        if (err) {
          res.send({ massage: "auth token failed" });
        } else {
          res.send(table);
        }
      });
    }
  });

router.post("/applocals", (req, res) => {
    app.locals.id = req.body.num;
    res.send({ massage: "thank you" });
  });
router.post("/time", (req, res) => {
    const fn = async () => {
      const table = await myModule.db.Timeworks.findAll({
        where: { userId: app.locals.id },
      });
      res.send(table);
    };
  
    const token = req.headers["x-access-token"];
  
    if (!token) {
      res.send({ massage: "token is failed" });
    } else {
      Jwt.verify(token, "MySecrete", (err, decoded) => {
        // console.log("verifytoken", token);
        if (err) {
          Jwt.verify(token, "MySecreteManger", (err, decoded) => {
            if (err) {
              res.send({ massage: "error auth token" });
            } else {
              console.log("else verify", fn(), (req.userId = decoded.id));
              // fn();
            }
            // res.send({ massage: "error auth token" });
          });
        } else {
          fn();
          //   res.send(token);
          req.userId = decoded.id;
          //   next();
        }
      });
    }
  });
  export default router;
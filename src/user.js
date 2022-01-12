import express from "express";
import myModule from '../connect/moduleDefine.js'
import generateToken from "../connect/generteToken.js"
import Jwt, { decode } from "jsonwebtoken";

const router = express.Router()
const app = express();
app.locals.pass = 0;
app.locals.id = 0;

router.post("/logIn", async (req, res) => {
    const { name, password } = req.body;
    console.log("login", name);
    const authentication = await myModule.db.List.findOne({
      where: { name: name, userId: password },
    })
      .then((data) => {
        (app.locals.id = data.id), console.log("app.locals.id ", app.locals.id);
        app.locals.pass = req.body.password;
        // res.send("good job"),
        res.json({ token: generateToken.crateToken(req.body.name) });
      })
      .catch((err) => {
        res.send("Invalid username or password");
        console.log("Error", err);
      });
    });
    router.post("/applocals", (req, res) => {
        app.locals.id = req.body.num;
        res.send({ massage: "thank you" });
      });
      router.post("/timein", async (req, res) => {
        const date = new Date();
        const dateTime = date.toLocaleString("en-GB");
        const upbeatValueIn = { timeIn: dateTime };
        const fn = async () => {
          const table = await myModule.db.Timeworks.findAll({
            where: { userId: app.locals.id },
          });
          res.send(table);
        };
        await myModule.db.Timeworks.create({
          userId: app.locals.id,
          createdAt: new Date(),
          updatedAt: new Date(),
          // idUniq: 1,
          timeIn: dateTime,
          timeOut: null,
        });
        fn();
      });
      router.post("/timeout", async (req, res) => {
        const date = new Date();
        const dateTime = date.toLocaleString("en-GB");
        const upbeatValueOut = { timeOut: dateTime };
        const fn = async () => {
          const table = await myModule.db.Timeworks.findAll({
            where: { userId: app.locals.id },
          });
          res.send(table);
        };
        if (
          await myModule.db.Timeworks.findOne({
            where: { id: req.body.id, timeOut: null },
          })
        ) {
          await myModule.db.Timeworks.update(upbeatValueOut, {
            where: { id: req.body.id, userId: app.locals.id },
          }).then((result) => {
            // here your result is simply an array with number of affected rows
            console.log("resultp", req.body);
            fn();
          });
        }
        // res.send({massage:100}) 
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
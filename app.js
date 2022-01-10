// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// import db from "./index.js";
import moment from "moment";
import seq from "./sequelize.js";
import Sequelize from "./connect/listNames.js";
import express from "express";
import cors from "cors";
// import Timeworks from "./connect/belongstoandmany.js";
// import Timeworks from "./connect/timeworks.js";
import generateToken from "./generteToken.js";
import Jwt, { decode } from "jsonwebtoken";
import verifytoken from "./verifyToken.js";
// import List  from "./connect/listNames.js";
// import List  from "./connect/belongstoandmany.js";
import List from "./connect/test.js";
import Timeworks from "./connect/test.js";

console.log("list", List);
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

    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
app.locals.pass = 0;
app.locals.id = 0;

app.locals.manger = 0;
app.locals.timeOut = 0;
console.log("local", app.locals.pass);
app.get("/", (req, res) => {
  res.send({ massage: "i am here" })
  const fn = async () => {
    // const table = await Sequelize.findAll();
    // res.send(table);
  };
  fn();
});

app.post("/", (req, res) => {
  res.send({ massage: "massege" });
});
app.post("/remove", async (req, res) => {
  console.log("req.body", req.body);

  await List.db.List.destroy({
    where: {
      userId: req.body.num,
    },
  });
  const table = await List.db.List.findAll({});
  res.send(table);
});

app.post("/1", async (req, res) => {
  await List.db.List.create({
    name: req.body.name,
    phone: req.body.phone,
    job: req.body.job,
    userId: req.body.userId,
    // idUniq: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const table = await List.db.List.findAll({});
  res.send(table);
});
// console.log("generateToken", generateToken.crateToken());

app.post("/logIn", async (req, res) => {
  const { name, password } = req.body;
  console.log("login", name);
  const authentication = await Sequelize.findOne({
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
  // if (!authentication) {
  // console.log("app.locals.id ", app.locals.id);
  // app.locals.pass = req.body.password;
  // res.send("good job"),
  // res.json({ token: generateToken.crateToken(req.body.name) });
  // } else {
  //
  // }
});

app.post("/loginmanger", async (req, res) => {
  const manger = { name: "yoni", password: "300138013" };
  const { name, password } = req.body;

  // console.log("manger", table);
  if (name === manger.name && password === manger.password) {
    res.send({ token: generateToken.crateTokenManger(req.body.name) });
  }
});
app.post("/main", async (req, res) => {
  const table = await List.db.List.findAll({});
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
app.post("/applocals", (req, res) => {
  app.locals.id = req.body.num;
  res.send({ massage: "thank you" });
});
app.post("/verifytoken", async (req, res, next) => {
  // res.send("hi i m here")
  // generateToken.jwtVerify(req)
  // console.log("log  verify token",req.headers["x-access-token"]);
  //  var decoded = Jwt.verify(token,"MySecrete");
  //  console.log(decoded.);
});
// setMoreTime()
async function setMoreTime() {
  for (let i = 0; i < 5; i++) {
    const d = moment().subtract(i, "days").format("DD MM YYYY kk:mm:ss", true);

    const upbeatValueIn = { timeIn: d };
    // const fn = async () => {
    //   const table = await Timeworks.findAll({
    //     where: { userId: 300138013 },
    //   });
    //   // res.send(table);
    // };
    await Timeworks.db.Timeworks.create({
      userId: 5 ,
      createdAt: new Date(),
      updatedAt: new Date(),
      // idUniq: 3,
      timeIn: d,
      timeOut: null,
    });
    // fn();

    console.log("i", d);
  }
}
app.post("/timein", async (req, res) => {
  const date = new Date();
  const dateTime = date.toLocaleString("en-GB");
  const upbeatValueIn = { timeIn: dateTime };
  const fn = async () => {
    const table = await Timeworks.db.Timeworks.findAll({
      where: { userId: app.locals.id },
    });
    res.send(table);
  };
  await Timeworks.db.Timeworks.create({
    userId: app.locals.id,
    createdAt: new Date(),
    updatedAt: new Date(),
    // idUniq: 1,
    timeIn: dateTime,
    timeOut: null,
  });
  fn();
});
app.post("/timeout", async (req, res) => {
  const date = new Date();
  const dateTime = date.toLocaleString("en-GB");
  const upbeatValueOut = { timeOut: dateTime };
  const fn = async () => {
    const table = await Timeworks.db.Timeworks.findAll({
      where: { userId: app.locals.id },
    });
    res.send(table);
  };
  if (
    await Timeworks.db.Timeworks.findOne({
      where: { id: req.body.id, timeOut: null },
    })
  ) {
    await Timeworks.db.Timeworks.update(upbeatValueOut, {
      where: { id: req.body.id, userId: app.locals.id },
    }).then((result) => {
      // here your result is simply an array with number of affected rows
      console.log("resultp", req.body);
      fn();
    });
  }
  // res.send({massage:100}) 
});

app.post("/time", (req, res) => {
  const fn = async () => {
    const table = await Timeworks.db.Timeworks.findAll({
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

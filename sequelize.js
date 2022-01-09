import Sequelize from "sequelize";

const seq = new Sequelize("works", "root", "123456", {
  host: "localhost",

  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});


export default seq;

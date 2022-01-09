import Sequelize from "sequelize";
import dot from 'dotenv';
dot.config()

 const uriDb = "postgres://sxeogbfumoppas:51a05111450064513c5d85eff87b187ab429adc34b5209c635ea86bdc256e63c@ec2-44-198-214-172.compute-1.amazonaws.com:5432/dcpikb1kei60pu";
// const seq = new Sequelize("works", "root", "123456", {
//   host: "localhost",

//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// });

const seqUri = new Sequelize(process.env.DATABASE_URL,{
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}
)
seqUri
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
export default seqUri;

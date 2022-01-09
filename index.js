import mysql from "mysql2";
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "works",
  password: "123456",
});

function CreatQuery(pool) {
  return new Promise((res, rej) => {
    pool.query("SELECT * FROM `list-name`", (error, results, fields) => {
      res(results);
      console.log("test", results);
      if (error) return rej(error);
    });
  });
}

export default  pool;
 CreatQuery(pool).then((results) => {
  console.log("res", results);
 return results;
}); 
 
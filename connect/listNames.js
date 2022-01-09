import sequelize from "sequelize";
import Seq from "../sequelize.js";
import Timeworks from "./timeworks.js";
let List = Seq.define("list-names", {
  id: {
    type: sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: sequelize.STRING,
  },
  phone: {
    type: sequelize.INTEGER,
  },
  job: {
    type: sequelize.STRING,
  },
  userId: { type: sequelize.INTEGER }
  
});
// ListC
// List.hasMany(Timeworks,{foreignKey:"userId"})
// Timeworks.belongsTo(List ,{foreignKey:"userId"})

export default List; 

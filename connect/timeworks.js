import sequelize from "sequelize";
import Seq from "../sequelize.js";
import List from "./listNames.js";
let Timeworks = Seq.define("timeworks", {
  id: {
    type: sequelize.INTEGER,
    allowNull: false,
    
  },
  timeIn: { type: sequelize.STRING },
  timeOut: { type: sequelize.STRING },
  userId: {
    type: sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});

// Timeworks.hasMany(List,{foreignKey:"userId"})
// Timeworks.belongsTo(List ,{foreignKey:"userId"})

export default Timeworks;

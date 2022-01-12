import sequelize from "sequelize";
import Seq from "./sequelize.js";
const db = {
  List: Seq.define("list-names", {
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
    userId: { type: sequelize.INTEGER, allowNull: false ,},
    // idUniq:{type: sequelize.INTEGER,
    //   allowNull: false,}
  }),
  Timeworks: Seq.define("timeworks", {
    id: {
      type: sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    timeIn: { type: sequelize.STRING },
    timeOut: { type: sequelize.STRING },
    userId: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    // idUniq:{type: sequelize.INTEGER,
    //   allowNull: false,}
  }),
};

const common = (options) => ({
  ...options,
});

// ListC
db.List.hasMany(db.Timeworks, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKeyConstraint: true 

});
db.Timeworks.belongsTo(db.List, {
  foreignKey: "userId", 
  
  // onDelete: "CASCADE",
  // onUpdate: "CASCADE",
}); 
// List.belongsTo(Timeworks,{foreignKey:"userId"})
export default {
  db,
}; 

import List from "./listNames.js";
import Timeworks from "./timeworks.js";
//  List
// 
export default
 List.hasMany(Timeworks,{foreignKey:"userId"}) ;
    Timeworks.belongsTo(List ,{foreignKey:"userId"})


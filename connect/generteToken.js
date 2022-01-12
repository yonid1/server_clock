import Jwt, { decode } from "jsonwebtoken"
 const crateToken = (id) => {
    return Jwt.sign({id},"MySecrete",{
        expiresIn:"60m"
    });
}
 const crateTokenManger = (id) => {
    return Jwt.sign({id},"MySecreteManger",{
        expiresIn:"50m"
    });
}
// const jwtVerify = (req,res,next)=>{
//     const token = req.headers["x-access-token"];
//     if(!token){
//         res.send("token is failed")
//     }else{Jwt.verify(token,"MySecrete",(err ,decoded)=>{
//         if(err){
//             res.json({auth:false,message:"connected failed"})
//         }else{
//             req.userId=decoded.id;
//             next()
//         }
//     })}
// }
export default  {crateToken,crateTokenManger}
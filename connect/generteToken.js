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

// }
export default  {crateToken,crateTokenManger}
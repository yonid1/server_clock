import Jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  {
    if (!token) {
      return res.send({massage:"token is failed go to login"});
    } else {
      Jwt.verify(token, "MySecrete", (err, decoded) => {
        // console.log("verifytoken", token);
        if (err) {
          return res.send({massage:"token is failed"});
        } else {
          console.log("decoded", decoded);
          //   res.send(token);
          req.userId = decoded.id;
          //   next();
        }
      });
    }
  }
};
export default verifyToken;

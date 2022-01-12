import express from "express";
const router = express.Router()
router.post("/", (req, res) => {
    res.send({ massage: "massege" });
  });
  export default router;
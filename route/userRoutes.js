const { register, validRegistration, loginvalidation, login, getuser } = require("../controller/Usercontroller");
const verifyuser = require("../middleware/verifyuser");

const router = require("express").Router();

router.post("/register",validRegistration,register);

router.post("/login",loginvalidation,login);
router.get("/getuser",verifyuser,getuser);


module.exports = router;
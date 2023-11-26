
const { CreateBlog, FetchAllBlog, UpdateBlog, DeleteBlog, FetchMyblogs, Blog } = require("../controller/blogController");
const verifyuser = require("../middleware/verifyuser");

const router = require("express").Router();


router.post("/createblog", verifyuser,CreateBlog);
router.get("/allblogs",FetchAllBlog );
router.put("/updateblog/:id",verifyuser,UpdateBlog);
router.delete("/deleteblog/:id",verifyuser,DeleteBlog);
router.get("/myblogs",verifyuser,FetchMyblogs);
router.get("/blog/:id",Blog);


module.exports = router;
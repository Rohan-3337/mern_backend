const BlogSchema = require("../models/BlogSchema");
const { findById } = require("../models/User");



module.exports.CreateBlog = async(req,res) => {
    let success = false;
    try {
        const {title,desc,content,img_url} = req.body;
        const { user} = req.data;
        const blog = await BlogSchema.create({ user: user._id,title: title, desc: desc, content: content, img_url:img_url});
        console.log(blog);
        success = true;
        res.statusCode = 200;
        return res.json({success,blog,msg:"blog created successfully"})

    } catch (error) {
        res.statusCode = 500;
        return res.json({success: false,error: error});
    }
}

module.exports.FetchAllBlog = async(req, res) =>{
    let success = false;
    try{
        const allblog = await BlogSchema.find().populate("user").maxTimeMS(20000);;
        console.log(allblog);
        success = true;
        return res.json({success,blogs: allblog});

    }catch(err){
        console.log(err);
        return res.json({success, error: err});
    }
}


module.exports.UpdateBlog = async (req, res) => {
    let success = false;
    try {
        const {title,desc,content,img_url} = req.body;
        const { user} = req.data;
        const {id} = req.params;
        const newBlog  = {};
        title ? newBlog.title = title: "";
        desc ? newBlog.desc = desc : ""; 
        content ? newBlog.content = content: "";
        img_url ? newBlog.img_url = img_url :"";
        let blog  = await BlogSchema.findById(id);
        console.log(blog);
        if(!blog) {
            return res.status(404).json({success, error: "not found"});

        }
        if(blog.user.toString() !== user._id){
            return res.status(501).json({success, error: "not allowed"});

        }
        let updatedblog = await BlogSchema.findByIdAndUpdate(req.params.id,{$set:newBlog},{new:true});
        success = true;
        return res.json({success, updatedblog});



        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"internal server error"})
        
    }
}


module.exports.DeleteBlog = async (req,res) =>{
    let success = false;
    try {
        const { user}  = req.data;
        let blog  = await BlogSchema.findById(req.params.id);
        if(!blog) {
            return res.status(404).json({success, error: "not found"});

        }
        if(blog.user.toString() !== user._id){
            return res.status(501).json({success, error: "not allowed"});

        }
        blog =  await BlogSchema.findByIdAndDelete(req.params.id).catch((err) =>{
            console.error(err);
        });
        const updatedblog =  await BlogSchema.find().populate('user');
        success =  true;

        return res.status(200).json({success,blog,updatedblog});

        
    } catch (error) {
        console.error(error)
        res.status(500).json({ success,error:"internal server error"})
        
    }
}

module.exports.FetchMyblogs = async(req,res) =>{
    let success = false;
    try {
        const { user}  = req.data;
        const blogs = await BlogSchema.find({user:user._id}).populate("user");
        if(!blogs){
            return res.status(404).json({success, msg: "not found"});
        }
        success = true;
        return res.status(200).json({success, blogs,msg:"all blog found"});
    } catch (error) {
        console.error(error)
        res.status(500).json({ success,msg:"internal server error"})
        
    }
}



module.exports.Blog = async(req,res) =>{
    let success = false;
    const id = req.params.id;

    try {
        const blog = await BlogSchema.findById(id).populate("user");
        if(!blog){
            return res.status(404).json({success,msg:"Blog not found"});

        }
        success = true;
        return res.json({success,msg:"blog found",blog});
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ success,msg:"internal server error"})
        
    }
}
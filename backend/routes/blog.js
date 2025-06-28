const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const multer  = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    
    cb(null, `${Date.now()}-${file.originalname}` );
  }
})

const upload = multer({ storage: storage })
router.post('/add',upload.single('coverImage'),async(req,res)=>{
    const {title,body}=req.body;
    const blog = await Blog.create({
        body,
        title,
        createdBy:req.user._id,
        coverImageURL:`/uploads/${req.file.filename}`
    })
    return res.json({success:true});
})

router.get('/all',async(req,res)=>{
    try {
         const blogs = await Blog.find({}).populate('createdBy');
         return res.json({success:true, blogs});
        
    } catch (error) {
      console.log('error faced while fetching blogs ', error.message);
        return res.json({success:false});
    }
})

    router.get('/:id',async(req,res)=>{
      const BlogId =req.params.id;
        try {
            const blog = await Blog.findOne({_id:BlogId}).populate('createdBy');
            if(blog==null) return res.json({success:false,blog:null});
            return res.json({success:true, blog});
            
        } catch (error) {
          console.log('error faced while fetching blogs ', error.message);
            return res.json({success:false});
        }
    })

    
module.exports = router;
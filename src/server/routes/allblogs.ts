import * as express from 'express';
import DB from '../db';
let router = express.Router();

//handles get all blogs request
router.get("/blogs", async (req, res) => {
    try {

        let blogs;
        blogs = await DB.blog.GetBlogs();

        res.json(blogs);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;

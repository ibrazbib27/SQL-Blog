import * as express from 'express';
import DB from "../db";
let router = express.Router();

//handles get chirp request
router.get("/:id/getblog", async (req, res) => {
    try {
        let id = await req.params.id;
        let blog = await DB.blog.GetBlog(id);
        res.json(blog);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
//handles get chirp request
router.get("/:id/gettag", async (req, res) => {
    try {
        let id = await req.params.id;
        let tags = await DB.blog.GetBlogTags(id);
        res.json(tags);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
//handles get chirp request
router.get("/authors", async (req, res) => {
    try {
        let chirp = await DB.blog.GetAuthors();
        res.json(chirp);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
//handles get chirp request
router.get("/tags", async (req, res) => {
    try {
        let chirp = await DB.blog.GetTags();
        res.json(chirp);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

//handles posting new chirp
router.post("/add", async (req, res) => {
    try {
       await DB.blog.CreateBlog(req.body);
       res.sendStatus(200);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

//handles posting new username
router.post("/createblogtags", async (req, res) => {
    try {
        await DB.blog.CreateBlogtoTagEntry(req.body);
        res.sendStatus(200);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

//handles posting new username
router.post("/blogtagspost", async (req, res) => {
    try {
        await DB.blog.PostTags(req.body);
        res.sendStatus(200);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

//handles chirp delete request
router.delete("/:id/blog", async (req, res) => {
    try {
        let id = await req.params.id;
        await DB.blog.DeleteBlog(id);
        res.sendStatus(200);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});
//handles chirp delete request
router.delete("/:id/tags", async (req, res) => {
    try {

        let id = await req.params.id;
        await DB.blog.DeleteTags(id);
        res.sendStatus(200);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

//handles chirp updates
router.put("/:id/blog", async (req, res) => {
    try {
        let id = await req.params.id;
        await DB.blog.UpdateBlog(id, req.body);
        res.sendStatus(200);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});


export default router;

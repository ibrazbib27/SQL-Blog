import * as express from 'express';
import myBlogRoutes from './routes/blogs';
import allMyBlogs from "./routes/allblogs";
let router = express.Router();

router.use('/getall', allMyBlogs);
router.use('/api', myBlogRoutes);

export default router;

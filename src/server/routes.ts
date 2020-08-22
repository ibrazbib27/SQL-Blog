import * as express from 'express';
import myChirpRoutes from './routes/blogs';
import allMyChirps from "./routes/allblogs";
let router = express.Router();

router.use('/getall', allMyChirps);
router.use('/api', myChirpRoutes);

export default router;
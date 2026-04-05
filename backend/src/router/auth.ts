import express from 'express'
import {handlelogin,handlesignup,handlelogout} from '../controller/auth'
import protect from '../middlewares/authmiddleware'
const router=express.Router();

router.post('/login',handlelogin);
router.post('/signup',handlesignup);
router.get('/logout',protect,handlelogout);
export default router;
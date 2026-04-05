import express from 'express'
import {handlelogin,handlesignup,handlelogout,getuserprofile} from '../controller/auth'
import protect from '../middlewares/authmiddleware'
const router=express.Router();

router.post('/login',handlelogin);
router.post('/signup',handlesignup);
router.get('/logout',protect,handlelogout);
router.get('/me',protect,getuserprofile);
export default router;
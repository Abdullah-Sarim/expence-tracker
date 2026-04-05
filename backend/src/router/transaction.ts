import express from 'express'
import {addtransaction,deletetransaction,gettransaction} from '../controller/transaction'
import protect from '../middlewares/authmiddleware'
import { getDashboardData } from '../controller/getstats';
const router=express.Router();

router.post('/addtransaction',protect,addtransaction);
router.delete('/delete/:id',protect,deletetransaction);
router.get('/alltransactions',protect,gettransaction);
router.get('/dashboard',protect,getDashboardData);
export default router;
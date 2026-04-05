import express from 'express'
import {addtransaction,deletetransaction} from '../controller/transaction'
import protect from '../middlewares/authmiddleware'
import { getDashboardData } from '../controller/getstats';
const router=express.Router();

router.post('/addtransaction',protect,addtransaction);
router.delete('/delete/:transactionid',protect,deletetransaction);
router.get('/dashboard',protect,getDashboardData);
export default router;
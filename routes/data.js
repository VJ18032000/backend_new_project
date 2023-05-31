const express=require('express')
const router=express.Router()

const dataroutes=require('../controllers/data')

router.put('/data',dataroutes.Updatedata)
router.post('/data/data',dataroutes.details)
router.post('/data',dataroutes.createData)
router.delete('/data',dataroutes.deleteTask)

module.exports=router
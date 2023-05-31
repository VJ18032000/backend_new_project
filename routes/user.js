const express=require('express')
const router=express.Router()

const userroutes=require('../controllers/user')

router.post('/register',userroutes.register)
router.post('/login',userroutes.login)

module.exports=router
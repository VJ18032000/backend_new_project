const bcrypt=require('bcrypt')
const User=require('../models/user')
const jwt=require('jsonwebtoken')
const JWT_SECRET="ZYXMNSHDGDWUWHhjsnssgszbsjsjs"

const generateToken=(id)=>{
    return jwt.sign({id},JWT_SECRET,{expiresIn:'120s'})
}

const register=async(req,res)=>{
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(req.body.password.toString(),salt)
    const user=new User({
        username:req.body.username,
        password:hashedPassword
    });
    User.find({ username: req.body.username })
    .then((value)=>{
        if(value.length==0){
            user.save()
            .then((data)=>{
                res.status(201).send({user:data.username,message:"user register successfully...",token:generateToken(data.username)})
            }).catch((err)=>res.send(err))
        }else{
            res.send({message:"Already user register..."})
        }
    }).catch((err)=>res.send(err))
}

const login = (req, res) => {   
    var username = req.body.username
    var password = req.body.password

    User.findOne({ username: username })
        .then(async user => {
            if (user) {
                const pass=await bcrypt.compare(password, user.password);
                if(pass) {
                    res.status(200).send({ user:user.username,"message": "loggedin successfully",token:generateToken(user.username)})
                } else {
                    res.send({ "message": "invalid password"})
                }
            } else {
                res.send({ "message": "invalid username"})
            }
        })
}
const insert=(req,res)=>{
 const id=req.body.id
 const task=req.body.task

 User.findByIdAndUpdate({_id:id},{task:task})
 .then((data)=>{
    res.send({message:"update successfully"})
 }).catch(err=>res.send(err))

}
const details=(req,res)=>{
    User.findById({_id:req.body.id})
    .then((data)=>{
        res.send(data)
    }).catch(err=>res.send(err))
}

module.exports={
    register,login,insert,details
}
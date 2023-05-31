const Task = require('../models/data')
const jwt=require('jsonwebtoken')
const JWT_SECRET="ZYXMNSHDGDWUWHhjsnssgszbsjsjs"

const createData = (req, res) => {
    const task = new Task({
        username: req.body.username,
        task: req.body.task
    })
    task.save()
        .then((data) => {
            res.status(201).send({ message: "task created" })
        }).catch(err => res.send(err))
}

const Updatedata = (req, res) => {
    const task = req.body.task
    const id = req.body.id

    Task.findByIdAndUpdate({ _id: id }, { task: task })
        .then((data) => {
            res.send({ message: "update successfully" })
        }).catch(err => res.send(err))

}
const details = (req, res) => {
    const user=jwt.verify(req.body.token,JWT_SECRET)
    Task.find({ username: user.id })
        .then((data) => {
            res.send(data)
        }).catch(err => res.send(err))
}

const deleteTask=(req,res)=>{
    Task.findByIdAndDelete({_id:req.query.id})
    .then((data)=>{
        res.send({message:"deleted successfully"})
    }).catch(err=>res.send(err))
}

module.exports = {
    createData,Updatedata, details,deleteTask
}
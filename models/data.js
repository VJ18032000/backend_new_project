const mongoose=require('mongoose')

const taskDetails=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    task:{
        type:String,
        require:false
    }
})
module.exports=mongoose.model('task',taskDetails)
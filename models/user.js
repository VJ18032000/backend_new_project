const mongoose=require('mongoose')

const userDetails=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
})
module.exports=mongoose.model('user',userDetails)
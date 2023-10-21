const mongoose=require('mongoose')

const authSchema=mongoose.Schema({
    first:{type:String, required: true},
    last:{type:String, required: true},
    email:{
        type:String,
        required: [true, 'User email is required'],
        unique: true,
        validate: {
            validator: function (v) {
                
                return /@(gmail\.com|yahoo\.in)$/.test(v);
            },
            message: 'Email must be from @gmail.com or @yahoo.in domains'
        }},
        
    password:{
        type:String,
        required: true,
        validate: {
            validator: function (v) {
                
                return v.length >= 8;
            },
            message: 'Password must be at least 8 characters long'
        }},
    place:{
        type:String,
        required: [true,'Place must not be empty'],
        validate:{
            validator:function(v){
                return v.length>0
            },
            message:'Place must not be empty'
        }
    }
},{
    timestamps: true,
    versionKey:false
})

const AuthModel=mongoose.model('auth',authSchema)

module.exports={
    AuthModel
}
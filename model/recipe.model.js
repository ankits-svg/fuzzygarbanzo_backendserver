const mongoose=require('mongoose')

const recipeSchema=mongoose.Schema({
    
    userId:{
        type:String,
        required:true
    },
    recipeId:{
        type:Array,
        default:[],
        required:true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }

},{
    timestamps: true,
    versionKey:false
})

const RecipeModel=mongoose.model('recipe',recipeSchema)

module.exports={
    RecipeModel
}
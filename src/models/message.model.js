let mongoose= require('mongoose');



 var mongoDB = 'mongodb://localhost:27017/Rest_API_TEST_DB';
mongoose.connect(mongoDB, { useNewUrlParser: true });
let UserSchema= new mongoose.Schema({
  author:{
    type:String,
    required:true,
  },
  article:{
    type:String
  }
});

module.exports= mongoose.model('Message',UserSchema);

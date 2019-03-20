let mongoose= require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;


 var mongoDB = 'mongodb://localhost:27017/Rest_API_TEST_DB';
mongoose.connect(mongoDB, { useNewUrlParser: true });
//mongoose.connect(`mongoose://${user}:${passsword}@${database_host}/${database_name}`);

let UserSchema= new mongoose.Schema({
  name:String,
  email:{
    type:String,
    required:true,
    unique:true
  },
 password: {
  type: String,
  trim: true,
  required: true
 }
});
// hash user password before saving into database
UserSchema.pre('save', function(next){
this.password = bcrypt.hashSync(this.password, saltRounds);
next();
});

module.exports= mongoose.model('User',UserSchema);

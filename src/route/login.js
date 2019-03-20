let UserModel=require('../models/user.model.js');
let  express= require('express');
let router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
router.post('/login',(req,res)=>
{
  if(!req.body)
  {
    return res.status(401).send("Bad request");
  }


    UserModel.findOne({email:req.body.email} ,(err, userInfo)=>{
        if(!userInfo)
        {
          res.json({status:"error", message: "Invalid email/password!!!", data:null});
        }else {
         console.log(`${req.body.password}=======>${userInfo.password}======> ${req.app.get('secretKey')}`);
            if(bcrypt.compareSync(req.body.password, userInfo.password)) {
             const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
            res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
          }  else{
           res.json({status:"error", message: "Invalid email/password!!!", data:null});
          }
        }

      });

});

module.exports=router;

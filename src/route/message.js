let MessageModel=require('../models/message.model.js');
let  express= require('express');
let router = express.Router();

router.post('/message/create',(req,res)=>
{
  if(!req.body)
  {
    return res.status(401).send("Bad request");
  }


    let model= new MessageModel(req.body);

    model.save().then(doc=>{
      if(!doc || doc.lenght=== 0)
      {
        return res.status(500).send("Internal server error");
      }
      return res.status(201).send(doc);
    }
  ).catch(err=>
  {
    return res.status(500).json(err);
  });
})


router.post('/message/get',(req,res)=>
{
  MessageModel.find()
    .then(doc => {

      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports=router;

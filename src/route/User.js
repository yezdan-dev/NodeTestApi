let UserModel=require('../models/user.model.js');
let  express= require('express');
let router = express.Router();


router.post('/user/create',(req,res)=>
{
  if(!req.body)
  {
    return res.status(401).send("Bad request");
  }

  let model= new UserModel(req.body);
  model.password='admin123'
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


});



// GET
router.post('/user/getbyemail', (req, res) => {
  if(!req.body.email) {
  }
  return res.status(400).send('Missing URL parameter: email')
  console.log(`${req.body.email}`);

  UserModel.findOne({
    email:req.body.email
  })
    .then(doc => {
      if(!doc || doc.length===0)
      {
        res.status(200).send('No record Found')
      }
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
 //GET All
router.post('/user/getall', (req, res) => {


  UserModel.find()
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// UPDATE
router.put('/user/modify', (req, res) => {
  if(!req.query.email) {
    return res.status(400).send('Missing URL parameter: email')
  }

  UserModel.findOneAndUpdate({
    email: req.query.email
  }, req.body, {
    new: true
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// DELETE
router.delete('/user/delete', (req, res) => {
  if(!req.query.email) {
    return res.status(400).send('Missing URL parameter: email')
  }

  UserModel.findOneAndRemove({
    email: req.query.email
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports=router;

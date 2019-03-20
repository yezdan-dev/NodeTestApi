let express=require('express');
let router= express.Router();

router.get('/person',(req,res)=>{
  if(req.query.name)
  {
      res.send(`this is a test ap2 ${req.query.name}`);

  }else {

      res.send('this is a test api');
    }


});
router.get('/person/:name',(req,res)=>{
  res.send(`this is a test api ${req.params.name}`);
});
router.get('/person/error',(req,res)=>{
  console.log('Error API Call');
  throw new Error('this is a forced error');
});
module.exports=router

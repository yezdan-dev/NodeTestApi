let express=require('express');
let  app =express();
var jwt = require('jsonwebtoken');
let bodyParser=require('body-parser');
app.set('secretKey', 'nodeRestApi');
app.use(bodyParser.json());
app.use((req,res,next)=>{
  console.log(`${new Date().toString()}=>${req.originalUrl}=>${req.body.toString()}`);
  next();
});
app.use(require('./route/user'));
app.use(require('./route/login'));
  app.use( require('./route/person'));
    app.use(validateUser,require('./route/message'));
  //handelling 404
  app.use((req,res,next)=>{
  res.status(404).send('Resource not found');
  });

  //handelling 500
  app.use((err,req,res,next)=>{
    console.error(err.stack);
  res.status(500).send('Internal Server Error');
  });



  function validateUser(req, res, next) {
  jwt.verify(req.headers['access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });

}
// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
 let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// handle errors
app.use(function(err, req, res, next) {
 console.log(err);

  if(err.status === 404)
   res.status(404).json({message: "Not found"});
  else
    res.status(500).json({message: "Something looks wrong :( !!!"});
});
const PORT=process.env.PORT || 3000
app.listen(PORT,() =>
console.info(`Sever has started on the port ${PORT}`)
);

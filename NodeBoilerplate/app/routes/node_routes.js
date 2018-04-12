module.exports=function(app,db){
  app.get('/nodes/', (req,res)=>{
    res.send('Hello')
  });
};

var ObjectID = require('mongodb').ObjectID;
var CircularJSON = require('circular-json');
module.exports = function(app, db) {
  app.get('/', (req, res) => {
    // const id = req.params;
    // console.log(id + " - here01" );
    // console.log(req.body.stack + "----");
    var name = "Hello";
    res.render('index',
    {
      showName:req
    });
  });
  // CRUD Create Read Upate Delete
  app.post('/create/',(req, res) => {
    const record = {
      stars:"0",
      basics:{name:"",family:"",middle:"",age:"",rank:""},
      salary:{quantity:"",currency:"USD"},
      nok:{name:"",family:"",middle:"",age:"",rank:"Wife"},
      cert:[{name:"",country:"",city:"",number:"",from:"",to:""}],
      exp:[{vname:"",flag:"",rank:"",from:"",to:"",total:"",lsalary:""}]
    }
    //record = req.body;
    //{'_id':new ObjectID(req.params.id)}
    console.log(record);
    db.collection('test').insert(record, (err,results)=>{
      if(err){
        res.send({'error': 'Some error node routes'});
      }else{
        res.send({'ok': 'Added object', 'info':results });
        console.log(results);
      }
    });
  });
  app.post('/create/basic/',(req, res) => {
    // const record = {
    //   stars:"5",
    //   basics:{
    //     name:"Billd",
    //     family:"Gatesdd",
    //     middle:"Mc",
    //     age:"36",
    //     rank:"Ch.Eng"
    //   },
    //   salary:{
    //     quantity:"8700",
    //     currency:"USD"
    //   },
    //   nok:{
    //     name:"Vanessa",
    //     family:"Gates",
    //     middle:"Mc",
    //     age:"32",
    //     rank:"Wife"
    //   },
    //   cert:{
    //     name:"Chief Officer all ships",
    //     country:"UKR",
    //     city:"Izmail",
    //     number:"00970/2010/01",
    //     from:"14.10.2010",
    //     to:"unlimited"
    //   },
    //   exp:{
    //     vname:"Sereno",
    //     flag:"UKR",
    //     rank:"Ch.Eng",
    //     from:"14.10.2010",
    //     to:"14.12.2010",
    //     total:"2"
    //   }
    // }
    var record;
    record = req.body;
    //{'_id':new ObjectID(req.params.id)}
    console.log(record);
    db.collection('test').insert({'basics':{record}}, (err,results)=>{
      if(err){
        res.send({'error': 'Some error node routes'});
      }else{
        res.send({'ok': 'Added object'});
      }
    });
  });
  app.get('/read/:id', (req, res) => {
    // console.log(req);
    // const id = req.params;
    // console.log(id + " - here01" );
    // console.log(req.body.stack + "----");
    // var x = {
    //   basics:{
    //   name:"Bill",
    //   family:"Gates",
    //   middle:"Mc",
    //   age:"36",
    //   rank:"Ch.Eng"
    // }};
    var resultArray = [];
    var pointer = db.collection('test').findOne({'_id':new ObjectID(req.params.id)},()=>{
      res.send(resultArray);
    });
  });
  app.get('/list/', (req, res) => {
    var resultArray = [];
    var pointer = db.collection('test').find();
    pointer.forEach((doc,err)=>{
      resultArray.push(doc.basics);
    },()=>{
      res.send(resultArray);
    })
  });
  app.get('/list/:stars', (req, res) => {
    var fields = req.params;
    var star = fields.stars;
    console.log(fields+"------------------------------------");
    var resultArray = [];
    var pointer = db.collection('test').find();
    pointer.forEach((doc,err)=>{
      if(doc.stars == star){
        resultArray.push(doc);
      }
    },()=>{
      res.send(resultArray);
    })
  });
  app.put('/update/:id',(req, res) => {
    const updrecords = {
        stars:"5",
        basics:{
          name:"Billd",
          family:"Gatesdd",
          middle:"Mc",
          age:"36",
          rank:"Ch.Eng"
        },
        salary:{
          quantity:"8700",
          currency:"USD"
        },
        nok:{
          name:"Vanessa",
          family:"Gates",
          middle:"Mc",
          age:"32",
          rank:"Wife"
        },
        cert:{
          name:"Chief Officer all ships",
          country:"UKR",
          city:"Izmail",
          number:"00970/2010/01",
          from:"14.10.2010",
          to:"unlimited"
        },
        exp:{
          vname:"Sereno",
          flag:"UKR",
          rank:"Ch.Eng",
          from:"14.10.2010",
          to:"14.12.2010",
          total:"2"
        }

      // stars:req.body.stars,
      // basics:{
      //   name:req.body.name,
      //   family:req.body.family,
      //   middle:req.body.middle,
      //   age:req.body.age,
      //   rank:req.body.rank}
      //   ,
      // salary:{
      //   quantity:req.body.salary.quantity,currency:req.body.salary.currency},
      // nok:{name:req.body.nok.name,family:req.body.nok.family,middle:req.body.nok.middle,age:req.body.nok.age,rank:req.body.nok.rank},
      // cert:[{name:req.body.cert.name,country:req.body.cert.country,city:req.body.cert.city,number:req.body.cert.number,from:req.body.cert.from,to:req.body.cert.to}],
      // exp:[{vname:req.body.exp.vname,flag:req.body.exp.flag,rank:req.body.exp.rank,from:req.body.exp.from,to:req.body.exp.to,total:req.body.exp.total,lsalary:req.body.exp.lsalary}]
    }
    db.collection('test').update({'_id':new ObjectID(req.params.id)}, updrecords,()=>{
      if (err) {
        res.send({
          'error': 'Some error node routes'
        });
      } else {
        console.log(req.body.name);
        res.send(result);
        res.json({ message: 'Updated!' });
        // return 0;
      }
    });
  });
  app.delete('/delete/:id',(req, res) => {
    db.collection('test').remove({'_id':new ObjectID(req.params.id)},(err, result) => {
      if (err) {
        res.send({
          'error': 'Some error node routes ' + req.params.id
        });
      } else {
        res.send(result);
        return 0;
      }
    });
  });
};

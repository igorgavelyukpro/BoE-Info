var ObjectID = require('mongodb').ObjectID;
var CircularJSON = require('circular-json');
module.exports = function(app, db) {
  app.get('/main/:vals?', (req, res) => {
    console.log(req.query);       // {}       {...}      {}
    console.log(req.params.vals); //undefined undefined test
    console.log(req.query.master);

    // ?master=on
    // &off=on
    // &soff=on
    // &toff=on
    // &eng=on
    // &seng=on
    // &teng=on
    // &mm=on
    // &bosun=on
    // &ab=on
    // &os=on
    // &fromA=29
    // &toB=61
    // &searchfield=Sergey%2C+Petrov
    // &sectionsearch=Search
    var respond;
    if (req.query.sectionsearch!="Search"&&req.query.searchfield!="") {
      var resultArray = [];
      var pointer = db.collection('test').find();
      pointer.forEach((doc, err) => {
        resultArray.push(doc);
      }, () => {
        //res.send(resultArray);
        res.render('index', {'idArray':resultArray, 'saved':"NA"});
      })
      console.log(resultArray+"resultArray - - - - ");
    }
    if(req.query.sectionsearch=="Search"&&req.query.searchfield!=''){
      console.log("SEARCH!!!!!!!!!!!!!!!!!!!!!!");
      var searchparam = req.query.searchfield.split(" ");
      var resultArray = [];
      var pointer = db.collection('test').find();
      pointer.forEach((doc, err) => {
        for (var i = 0; i < searchparam.length; i++) {
          if (doc.basic.name == searchparam[i]||doc.basic.tel == searchparam[i]) {
            resultArray.push(doc);
          }
        }
      }, () => {
        //res.send(resultArray);
        res.render('index', {'idArray':resultArray, 'saved':"NA"});
      })
    }
  // var name = "Hello";

  });
  // CRUD Create Read Upate Delete
  app.get('/create/:id?', (req, res) => {
    res.render('getcreate', {'id':req.params.id , 'saved':"Not saved!" });
  });
  app.get('/nok/:id?', (req, res) => {
    res.render('nok', { 'id':req.params.id , 'saved':"Not saved!" });
  });
  app.post('/create/:id?', (req, res) => {
    // if(req.Url.path){}
    // let parsedArray = req;
    // console.log(req.query.toString());
    // console.log(req.params.searchfield);
      let record = {
        basic:{rank:"test",name:"test",family:"test",middle:"test",availabledate:"test",birthdate:"test",age:"test",
        stars:"test",salary:"test",tel:"test",email:"test",expirestatus:"test",nationality:"test",citizenship:"test",maritalstatus:"test",taxation:"test"},
        nok:{name:"",family:"",middle:"",age:"",rank:"Wife"},
        cert:[{name:"",country:"",city:"",number:"",from:"",to:""}],
        exp:[{vname:"",flag:"",rank:"",from:"",to:"",total:"",lsalary:""}]
      }
      //record = req.body;
      //{'_id':new ObjectID(req.params.id)}
      // console.log(record);
      db.collection('test').insert(record,(err, results) => {
        if (err) {
          res.render('404',{'id':req.params.id , 'saved':"Not saved!"});
        } else {
          let resid = results.ops[0];
          console.log(resid._id);
          res.render('create', {'id':resid._id , 'saved':"Not saved!"});
        }
      });

  });
  app.post('/create/basic/', (req, res) => {
    var record;
    record = req.body;
    //{'_id':new ObjectID(req.params.id)}
    console.log(record);
    db.collection('test').insert({
      'basic': {
        record
      }
    }, (err, results) => {
      if (err) {
        res.send({
          'error': 'Some error node routes'
        });
      } else {
        res.send({
          'ok': 'Added object'
        });
      }
    });
  });
  app.get('/read/:id', (req, res) => {
    var resultArray = [];
    var pointer = db.collection('test').findOne({
      '_id': new ObjectID(req.params.id)
    }, (err, idArray) => {
      resultArray.push(idArray);
      res.render('read', {'idArray':resultArray , 'saved':"Read!" });
    });
  });
  // app.get('/read/:id', (req, res) => {
  //   var resultArray = [];
  //   var pointer = db.collection('test').findOne({
  //     '_id': new ObjectID(req.params.id)
  //   }, (err, idArray) => {
  //     resultArray.push(idArray);
  //     res.render('read', {'idArray':resultArray , 'saved':"Read!" });
  //   });
  // });
  app.get('/list/', (req, res) => {
    var resultArray = [];
    var pointer = db.collection('test').find();
    pointer.forEach((doc, err) => {
      resultArray.push(doc);
    }, () => {
      //res.send(resultArray);
      res.render('list',{'idArray':resultArray, 'status':"POST from POST"});
    })
  });
  app.get('/list/:rank', (req, res) => {
    var fields = req.params;
    console.log(fields);
    var star = fields.rank;
    console.log(star + "------------------------------------");
    var resultArray = [];
    var pointer = db.collection('test').find();
    pointer.forEach((doc, err) => {
      console.log(doc.basic.rank+"doc here");
      if (doc.basic.rank == star) {
        resultArray.push(doc);
      }
    }, () => {
      res.send(resultArray);
    })
  });
  app.get('/update/:id?', (req, res) => {
    var resultArray = [];
    var pointer = db.collection('test').findOne({
      '_id': new ObjectID(req.params.id)
    }, (err, idArray) => {
      resultArray.push(idArray);
        res.render('update', {'idArray':resultArray, 'id':req.params.id , 'saved':"Saved!" });
    });
  });
  app.put('/update/:id', (req, res) => {
    // console.log(req.params.id);
    // console.log(req.body.name);
    console.log('/update/:id-start');
    const updrecords = {
      basic:{
        rank: req.body.rank,
        name: req.body.name,
        family: req.body.family,
        middle: req.body.middle,
        availabledate:req.body.availabledate,
        birthdate:req.body.birthdate,
        age: req.body.age,
        stars: req.body.stars,
        salary: req.body.salary,
        tel: req.body.tel,
        email: req.body.email,
        expirestatus:req.body.expirestatus,
        nationality:req.body.nationality,
        citizenship:req.body.citizenship,
        maritalstatus:req.body.maritalstatus,
        taxation:req.body.taxation},
      nok:{name:"",family:"",middle:"",age:"",rank:"Wife"},
      cert:[{name:"",country:"",city:"",number:"",from:"",to:""}],
      exp:[{vname:"",flag:"",rank:"",from:"",to:"",total:"",lsalary:""}]
      }
    var resultArray = [];
    var pointer = db.collection('test').findOne({
      '_id': new ObjectID(req.params.id)
    }, (err, result) => {
      let existrecords = {
        basic:{
          rank: result.basic.rank,
          name: result.basic.name,
          family: result.basic.family,
          middle: result.basic.middle,
          availabledate:result.basic.availabledate,
          birthdate:result.basic.birthdate,
          age: result.basic.age,
          stars: result.basic.stars,
          salary: result.basic.salary,
          tel: result.basic.tel,
          email: result.basic.email,
          expirestatus:result.basic.expirestatus,
          nationality:result.basic.nationality,
          citizenship:result.basic.citizenship,
          maritalstatus:result.basic.maritalstatus,
          taxation:result.basic.taxation},
        nok:{name:"",family:"",middle:"",age:"",rank:"Wife"},
        cert:[{name:"",country:"",city:"",number:"",from:"",to:""}],
        exp:[{vname:"",flag:"",rank:"",from:"",to:"",total:"",lsalary:""}]
        }
      // var resid = {'_id':req.params.id};
      if(req.body.rank!=="0"||req.body.name!==""){
        db.collection('test').update(existrecords, updrecords, (err,results) => {
          res.render('200',{'id':req.params.id, 'idArray':resultArray, 'status':"Status OK"});
          // res.send(results);
        });
      }else{
        res.render('404',{'id':req.params.id, 'idArray':resultArray, 'status':"Status ERR"});
        //res.send({results:"Fucked up"});
      }

    });
    //console.log(updrecords);
      // salary:{
      //   quantity:req.body.salary.quantity,currency:req.body.salary.currency},
      // nok:{name:req.body.nok.name,family:req.body.nok.family,middle:req.body.nok.middle,age:req.body.nok.age,rank:req.body.nok.rank},
      // cert:[{name:req.body.cert.name,country:req.body.cert.country,city:req.body.cert.city,number:req.body.cert.number,from:req.body.cert.from,to:req.body.cert.to}],
      // exp:[{vname:req.body.exp.vname,flag:req.body.exp.flag,rank:req.body.exp.rank,from:req.body.exp.from,to:req.body.exp.to,total:req.body.exp.total,lsalary:req.body.exp.lsalary}]

console.log('/update/:id-end');
  });
  app.delete('/delete/:id', (req, res) => {
    db.collection('test').remove({
      '_id': new ObjectID(req.params.id)
    }, (err, result) => {
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
  // var resultArray = [];
  // app.get('/massdelete/', (req, res) => {
  //   var pointer = db.collection('test').find();
  //   pointer.forEach((doc, err) => {
  //     resultArray.push(doc);
  //   }, () => {
  //     console.log(resultArray);
  //     res.render('massdelete', {'idArray':resultArray, 'status':"GET from GET"});
  //   })
  // });
  app.post('/massdelete/:id?', (req, res) => {
    var resultArray = [];
    var pointer = db.collection('test').find();
    pointer.forEach((doc, err) => {
      resultArray.push(doc);
    }, () => {
      res.render('massdelete',{'idArray':resultArray, 'status':"POST from POST"});
    });
    console.log(req.params.id);
    if (req.params.id) {
      db.collection('test').remove({
        '_id': new ObjectID(req.params.id)
      }, (err, result) => {
        if (err) {
          // res.send({'error': 'Some error node routes ' + req.params.id
          res.render('404',{'id':req.params.id, 'idArray':resultArray, 'status':"Status ERR"});
        } else {
          res.render('200',{'id':req.params.id, 'idArray':resultArray, 'status':"Status OK"});
        }
      });
    }
  });
};

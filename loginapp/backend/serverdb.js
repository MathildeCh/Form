const http = require('http');
const exp = require('express');
const bp = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const pws = require('p4ssw0rd');

const app = exp();

app.use( bp.urlencoded( {extended:false} ) );
app.use( bp.json() );

app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '9121',
    database : 'mydb'
  }
});

app.post('/login', (req, res) => {

  const { username, password } = req.body;
  console.log("userdata", username, password);

  db('login')
  .where(
    {
      username,
    })
  .select('password','user_id','username')
  .then( data => {
    let u = data[0].username;
    if(data.length > 0){
      if(pws.check(password,data[0].password, 10)){
          db('users')
            .join('login', 'users.id', 'login.user_id')
            .select('users.first_name', 'users.email','users.last_name','users.last_login_date')
            .where('users.id',data[0].user_id)
            .then( data => {
              console.log(data);
              res.send([{message:`Hello ${data[0].first_name}  ${data[0].last_name} your username is ${u}`,'variant':'success' }]);
            })
            .catch( err => {
              console.log(err);
              res.send({message:err.detail});
            })
      }
      else{
        res.send([{message:'Username Or Password does not exist', 'variant':'danger'}]);
      }
    }
    else {
      res.send([{message:'Username Or Password does not exist', 'variant':'danger'}]);
    }
  })
  .catch( err => {
    res.send([{message:err.detail, 'variant':'danger'}]);
  });
  // const hash = pws.hash(password,10);
  //
  // console.log(pws.check('123456', hash, 10));

});

app.post('/register', (req, res) => {
  // console.log(req.body);

  const { first_name,last_name,email,username, password } = req.body;
  console.log("reg", first_name,last_name,email,username, password);

  let response_message='';

  db.transaction( trx => {
    return trx
      .insert({
           first_name: first_name,
           last_name: last_name,
           email: email.toLowerCase(),
           created_date: new Date(),
           last_login_date: new Date(),
       }, '*')
      .into('users')
      .then( data => {
        response_message = `Hello ${data[0].first_name} ${data[0].last_name}. your ID is ${data[0].id}` ;
        return trx('login').insert(
          {
              username: username,
              password: pws.hash(password,10),
              user_id: data[0].id
           }
        );
      });
  })
  .then( inserts => {
    res.send({message:response_message});
  })
  .catch( err => {
    res.send({message:err.detail});
  });


  // db.transaction( trx => {
  //    return trx('users')
  //    .returning('*')
  //    .insert({
  //         first_name: firstname,
  //         last_name: lastname,
  //         email: email.toLowerCase(),
  //         created_date: new Date(),
  //         last_last_login_date: new Date(),
  //     })
  //    .then( data => {
  //      response_message = `Hello ${data[0].first_name} ${data[0].last_name}. your ID is ${data[0].id}`;
  //      return trx('login')
  //      .returning('*')
  //      .insert({
  //          username: username,
  //          password: pws.hash(password,10),
  //          user_id: data[0].id
  //       })
  //
  //     })
  //     .then( data => {
  //         trx.commit
  //         res.send({message:response_message});
  //     })
  //     .catch( err => {
  //         trx.rollback
  //         res.send({message:err.detail});
  //     })
  //   })

});

app.listen(3035);

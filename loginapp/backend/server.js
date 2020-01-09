const http = require('http');
const fs = require('fs');
const exp = require('express');
const bp = require('body-parser');
const cors = require('cors');

const app = exp();

app.use( bp.urlencoded( {extended:false} ) );
app.use( bp.json() );

app.use(cors());

app.post('/', (req, res) => {

  let response_data = {
    message: '',
    users: []
  }

  try {
     const f = fs.readFileSync('./users');
     response_data.users = JSON.parse(f);
  } catch (e) {
    // console.log('no file');
  } finally {
      try {
        if(isUserExist(response_data.users,req.body.username)){
          throw new Error('Username Exist!')
        }
        response_data.users.push(req.body);

        fs.writeFile('./users', JSON.stringify(response_data.users), err => {
           if(err){
             console.log(err);
           }
        });
      } catch (e) {
        response_data.message = e.message;
      }
  }

  response_data.users = response_data.users.map(user => {
    user.password = '*'.repeat(user.password.length);
    return user;
  });

  res.send(response_data);
});

const isUserExist = (arr,uname) => {
  const filterArray = arr.filter(user => {
  	return user.username === uname;
  });
  return filterArray.length > 0;
}

app.listen(3000);

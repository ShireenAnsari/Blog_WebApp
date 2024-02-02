import mysql from 'mysql2'
// export const db=mysql.createConnection({
//    host:"localhost",
//    user:'root',
//    password:'password',
//    database:'blog' 
// })
export const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'blog'

});

db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('Successfully to Mysql');
});
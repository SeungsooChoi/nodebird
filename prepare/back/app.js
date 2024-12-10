const express = require('express');
const postRouter = require('./routes/post');
const db = require('./models');
const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('DB 연결 성공');
  })
  .catch((err) => {console.error(err)});

app.get('/',  (req, res) => {
  res.send('hello world');
})

app.use('/post', postRouter); // prefix

app.listen(3065, () => {
  console.log(`Server listening on port`);
});
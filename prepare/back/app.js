const express = require('express');
const postRouter = require('./routes/post');

const app = express();

app.get('/',  (req, res) => {
  res.send('hello world');
})

app.use('/post', postRouter); // prefix

app.listen(3065, () => {
  console.log(`Server listening on port`);
});
const express = require('express');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const listObjects = require('./listfiles')
const app = express();
require('dotenv').config();

app.use(cookieParser('keyboard cat'))
//app.use(session({ cookie: { maxAge: 60000 }}));
app.use(session({
  secret: 'cookie_secret',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

app.set('json spaces', 5); // to pretify json response
app.set('view engine', 'ejs')
const PORT = process.env.PORT;
const fileparser = require('./fileparser');

/*app.get('/', (req, res)=>{
  res.render('pages/home_plain', { messages: req.flash('info') });
})*/

app.get('/', async (req, res)=>{
  const data = await listObjects()
  res.render('pages/home', { messages: req.flash('info'), objects: data.Contents })
})

app.post('/api/upload', async (req, res) => {
  await fileparser(req)
  .then(data => {
    /*res.status(200).json({
      message: "Success",
      data
    })*/
    req.flash('info', 'Upload complete!...')
    res.redirect('/');
  })
  .catch(error => {
    res.status(400).json({
      message: "An error occurred.",
      error
    })
  })
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
})

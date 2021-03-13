var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
var verifyToken = require('./auth');
var imageFunc = require('./image');
var jsonpatch = require('json-patch');

dotenv.config();
const app=express()
const port=process.env.PORT || 5000
app.use(express.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.post('/api/login', (req,res) => {
    const user = {
        username : req.body.username,
        password : req.body.password
    };
    jwt.sign({user},process.env.JWT_KEY, (err,token) => {
      res.json({
          token
      });
    });
  });
app.post('/api/jsonpatch', verifyToken, (req,res) => {
    jsonpatch.apply(req.body.jsonObject,req.body.jsonPatch);
    res.json({
        Patched: req.body.jsonObject
    });
});
app.post('/api/image', verifyToken, imageFunc, (req,res) => {
});
app.listen(port,()=>{
    console.log("server is on port"+port)
})
module.exports = app;
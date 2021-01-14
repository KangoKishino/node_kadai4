'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const userController = require('./controllers/userController');
const validateController = require('./controllers/validateController');

const app = express();

app.use('/public', express.static(__dirname + '/public'));
app.set('/public', path.join(__dirname, '/public'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', userController.getSignUpPage);
app.get('/dashboard', userController.auth, userController.getDashboardPage);
app.get('/signout', userController.removeAuth, userController.getSignInPage);
app.post('/signup', validateController.validateUser, userController.createUser, userController.createJWT, userController.getDashboardPage);
app.post('/signin', userController.checkSignIn, userController.createJWT, userController.getDashboardPage);
app.get('/signin', userController.getSignInPage);

module.exports = app;
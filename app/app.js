'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require("method-override");
const userController = require('./controllers/userController');
const boardController = require('./controllers/boardController');
const validateController = require('./controllers/validateController');

const app = express();

app.use('/public', express.static(__dirname + '/public'));
app.set('/public', path.join(__dirname, '/public'));
app.set('view engine', 'ejs');

app.use(
    methodOverride("_method", {
      methods: ["POST", "GET"]
    })
);

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
app.get('/new', userController.auth, boardController.getNewPage);
app.post('/new', validateController.validateBoard, userController.auth, boardController.newBoard, userController.getDashboardPage);
app.get('/:boardId/edit', userController.auth, boardController.edit);
app.put('/:boardId/update', validateController.validateBoard, userController.auth, boardController.updateBoard, userController.getDashboardPage);
app.delete('/:boardId/delete', userController.auth, boardController.deleteBoard, userController.getDashboardPage);

module.exports = app;
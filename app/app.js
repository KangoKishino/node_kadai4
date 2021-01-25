'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require("method-override");
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const likeController = require('./controllers/likeController');
const validateController = require('./controllers/validateController');
const errorController = require('./controllers/errorController');

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
app.get('/new', userController.auth, postController.getNewPage);
app.post('/new', validateController.validatePost, userController.auth, postController.newPost, userController.getDashboardPage);
app.get('/:postId/edit', userController.auth, postController.edit);
app.put('/:postId/update', validateController.validatePost, userController.auth, postController.updatePost, userController.getDashboardPage);
app.delete('/:postId/delete', userController.auth, postController.deletePost, likeController.deleteLike, userController.getDashboardPage);
app.post('/:postId/like', userController.auth, postController.changeLike, likeController.changeLike, userController.getDashboardPage);
app.post('/:postId/dislike', userController.auth, postController.changeDislike, likeController.changeDislike, userController.getDashboardPage);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

module.exports = app;
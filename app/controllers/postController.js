'use strict';

const db = require('../models');
const { validationResult } = require('express-validator');

exports.getNewPage = (req, res, next) => {
    db.Users.findOne({
        where: {id: req.user.id}
    })
        .then((user) => {
            res.render('new', {
                input: '',
                user: user.name,
                error: ''
            });
            res.status(200);
        })
        .catch((error) => {
            next(error);
        });
};

exports.newPost = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.render('new', { 
            input: req.body,
            user: req.user.name,
            error: errors.array()[0].msg
        });
    }
    const newPost = await db.Posts.build({
        title: req.body.title,
        text: req.body.text,
        userId: req.user.id,
        userName: req.user.name,
        like: 0
    });
    newPost
        .save()
        .then(() => {
            next();
        })
        .catch(() => {
            res.render('new', { 
                input: req.body,
                user: req.user.name,
                error: ''
            });
        });
};

exports.edit = (req, res, next) => {
    db.Posts.findOne({
        where: {id: req.params.postId}
    })
        .then((post) => {
            res.render('edit', {
                input: post,
                postId: req.params.postId,
                user: req.user.name,
                error: ''
            });
        })
        .catch((error) => {
            next(error);
        });
    
}

exports.updatePost = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.render('edit', { 
            input: req.body,
            postId: req.params.postId,
            user: req.user.name,
            error: errors.array()[0].msg
        });
    }
    const postId = req.params.postId;
    await db.Posts.update({ 
        title: req.body.title,
        text: req.body.text
    },
        { where: { id: postId }
    })
        .then(() => {
            next();
        })
        .catch((error) => {
            next(error);
        });
}

exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;
    db.Posts.destroy({
        where: { id: postId }
    })
        .then(() => {
            next();
        })
        .catch((error) => {
            next(error);
        });
}